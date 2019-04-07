using Instabuy.Data.EbayModels.Aspect_Histogram;
using Instabuy.Data.FullItem.Processed;
using Instabuy.Helpers;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace Instabuy.Data.Sql
{
    internal class EbaySearchRepository : IEbaySearchRepository
    {
        private EbaySettings _ebaySettings;

        public EbaySearchRepository(IOptions<EbaySettings> ebaySettings)
        {
            _ebaySettings = ebaySettings.Value;
        }

        public async Task<IEnumerable<AspectHistogram>> GetAspectHistogramsByCategoryIdAndAspects(int categoryId, List<AspectValue> aspects)
        {
            using (var client = new HttpClient())
            {
                var url = $"http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=getHistograms&SERVICE-VERSION=1.0.0&SECURITY-APPNAME={_ebaySettings.ApiKey}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&categoryId={categoryId}";

                for (int i = 0; i < aspects.Count; i++)
                {
                    var aspect = aspects[i];
                    url += $"&aspectFilter({i}).aspectName={aspect.Name}";

                    for (int j = 0; j < aspect.Values.Count; j++)
                    {
                        var value = aspect.Values[j];
                        url += $"&aspectFilter({i}).aspectValue({j})={value}";
                    }
                }

                using (var res = await client.GetAsync(url).ConfigureAwait(false))
                {
                    var response = await res.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var jsonResponse = JsonConvert.DeserializeObject<GetHistogramsResponseResponse>(response);

                    return jsonResponse.Normalize();
                }
            }
        }

        public async Task<IEnumerable<CategoryModel>> GetChildCategories(int categoryId)
        {
            using (var client = new HttpClient())
            {
                var url = $"http://open.api.ebay.com/Shopping?callname=GetCategoryInfo&appid={_ebaySettings.ApiKey}&siteid=3&CategoryID={categoryId}&version=729&IncludeSelector=ChildCategories";

                using (var res = await client.GetAsync(url).ConfigureAwait(false))
                {
                    var response = await res.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var xmlDoc = new XmlDocument();
                    xmlDoc.LoadXml(response);

                    var jsonResponse = JsonConvert.SerializeXmlNode(xmlDoc);

                    var categoryResponseModel = JsonConvert.DeserializeObject<GetCategoryInfoResponseModel>(jsonResponse);

                    return categoryResponseModel.GetCategoryInfoResponse.CategoryArray.Category;
                }
            }
        }

        public async Task<IEnumerable<EbayItemModelNormalized>> GetHistory(DateTime from, int categoryId, string keywords, int[] conditions, decimal? priceMin, decimal? priceMax, decimal? minFeedbackScore)
        {
            using (var client = new HttpClient())
            {
                var ninetyDaysAgo = from.ToString("o");
                
                var itemFilters = new List<ItemFilterParameter>
                {
                    new ItemFilterParameter
                    {
                        Name = "EndTimeFrom",
                        Values = new string[] { ninetyDaysAgo }
                    },
                    new ItemFilterParameter
                    {
                        Name = "AvailableTo",
                        Values = new string[] { "GB" }
                    },
                    new ItemFilterParameter
                    {
                        Name = "Condition",
                        Values = conditions.Select(c => c.ToString()).ToArray()
                    },
                    new ItemFilterParameter
                    {
                        Name = "Currency",
                        Values = new string[] { "GBP" }
                    },
                    new ItemFilterParameter
                    {
                        Name = "HideDuplicateItems",
                        Values = new string[] { "true" }
                    }
                };

                if (priceMin != null) itemFilters.Add(new ItemFilterParameter
                {
                    Name = "MinPrice",
                    Values = new string[] { priceMin.ToString() }
                });

                if (priceMax != null) itemFilters.Add(new ItemFilterParameter
                {
                    Name = "MaxPrice",
                    Values = new string[] { priceMax.ToString() }
                });

                if (minFeedbackScore != null) itemFilters.Add(new ItemFilterParameter
                {
                    Name = "FeedbackScoreMin",
                    Values = new string[] { minFeedbackScore.ToString() }
                });

                var url = $"http://svcs.ebay.com/services/search/FindingService/v1?" +
                    $"OPERATION-NAME=findCompletedItems&GLOBAL-ID=EBAY-GB&SERVICE-VERSION=1.7.0&SECURITY-APPNAME={_ebaySettings.ApiKey}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD" +
                    $"&keywords={keywords}" +
                    $"&categoryId={categoryId}" +
                    $"&{EbayHelper.ItemFilterBuilder(itemFilters.ToArray())}" +
                    $"&sortOrder=EndTimeSoonest" +
                    $"siteid=3";

                int totalPages = 0;

                using (var res = await client.GetAsync($"{url}&paginationInput.entriesPerPage=1").ConfigureAwait(false))
                {
                    var response = await res.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var responseModel = JsonConvert.DeserializeObject<FindCompletedItemsResponseModel>(response).FindCompletedItemsResponse.Normalize();

                    var totalItems = responseModel.PaginationOutput.TotalEntries;
                    totalPages = (int)Math.Ceiling((decimal)totalItems / 100);

                    if (totalPages > 100) totalPages = 100;
                }

                async Task<IEnumerable<EbayItemModelNormalized>> getHistoricalItems(int page)
                {
                    using (var res = await client.GetAsync($"{url}&paginationInput.entriesPerPage=100&paginationInput.pageNumber={page}").ConfigureAwait(false))
                    {
                        var response = await res.Content.ReadAsStringAsync().ConfigureAwait(false);
                        var responseModelPre = JsonConvert.DeserializeObject<FindCompletedItemsResponseModel>(response).FindCompletedItemsResponse;

                        var responseModel = responseModelPre.Normalize();

                        return responseModel.SearchResult.Items;
                    }
                }

                var itemTasks = Enumerable.Range(1, totalPages).Select(i => getHistoricalItems(i));

                var items = (await Task.WhenAll(itemTasks)).ToList().Where(l => l.Count() != 0).SelectMany(i => i).OrderByDescending(i => i.ListingInfo.EndTime).ToList();

                return items;
            }
        }

        public async Task<IEnumerable<FullItem.Processed.EbayItemModel>> GetMultipleItems(string[] itemIds)
        {
            using (var client = new HttpClient())
            {
                var url = $"http://open.api.ebay.com/shopping?" +
                    $"callname=GetMultipleItems" +
                    $"&responseencoding=JSON" +
                    $"&appid={_ebaySettings.ApiKey}" +
                    $"&siteid=3" +
                    $"&version=967" +
                    $"&IncludeSelector=Description,Details,ItemSpecifics" +
                    $"&ItemID={String.Join(',', itemIds)}";

                using (var res = await client.GetAsync(url).ConfigureAwait(false))
                {
                    var body = await res.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var responseJson = JsonConvert.DeserializeObject<FullItem.Raw.FullItemModel>(body);

                    var normalizedResponse = responseJson.Normalize();

                    return normalizedResponse.Items;
                }
            }
        }
    }
}
