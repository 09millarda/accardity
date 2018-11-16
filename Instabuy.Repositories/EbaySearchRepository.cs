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
        public async Task<IEnumerable<CategoryModel>> GetChildCategories(int categoryId)
        {
            using (var client = new HttpClient())
            {
                var url = $"http://open.api.ebay.com/Shopping?callname=GetCategoryInfo&appid=AlyMilla-Instabuy-PRD-e5d74fc8f-5894de12&siteid=3&CategoryID={categoryId}&version=729&IncludeSelector=ChildCategories";

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

        public async Task<IEnumerable<EbayItemModelNormalized>> GetHistory(DateTime from, int categoryId, string keywords, int[] conditions)
        {
            using (var client = new HttpClient())
            {
                var ninetyDaysAgo = from.ToString("o");
                StringBuilder conditionFilterSB = new StringBuilder();

                conditionFilterSB.Append("itemFilter(1).name=Condition");
                for (int i = 0; i < conditions.Length; i++)
                {
                    conditionFilterSB.Append($"&itemFilter(1).value({i})={conditions[i]}");
                }

                var url = $"http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&GLOBAL-ID=EBAY-GB&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=AlyMilla-Instabuy-PRD-e5d74fc8f-5894de12&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords={keywords}&categoryId={categoryId}&itemFilter(0).name=EndTimeFrom&itemFilter(0).value={ninetyDaysAgo}&{conditionFilterSB.ToString()}&sortOrder=EndTimeSoonest";

                int totalPages = 0;

                using (var res = await client.GetAsync($"{url}&paginationInput.entriesPerPage=1").ConfigureAwait(false))
                {
                    var response = await res.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var responseModel = JsonConvert.DeserializeObject<FindCompletedItemsResponseModel>(response).FindCompletedItemsResponse.Normalize();

                    var totalItems = responseModel.PaginationOutput.TotalEntries;
                    totalPages = (int)Math.Ceiling((decimal)totalItems / 100);
                }

                async Task<IEnumerable<EbayItemModelNormalized>> getHistoricalItems(int page)
                {
                    using (var res = await client.GetAsync($"{url}&paginationInput.entriesPerPage=100&paginationInput.pageNumber={page}").ConfigureAwait(false))
                    {
                        var response = await res.Content.ReadAsStringAsync().ConfigureAwait(false);
                        var responseModel = JsonConvert.DeserializeObject<FindCompletedItemsResponseModel>(response).FindCompletedItemsResponse.Normalize();

                        return responseModel.SearchResult.Items;
                    }
                }

                var itemTasks = Enumerable.Range(1, totalPages).Select(i => getHistoricalItems(i));

                var items = (await Task.WhenAll(itemTasks)).ToList().Where(l => l.Count() != 0).SelectMany(i => i).OrderByDescending(i => i.ListingInfo.EndTime).ToList();

                return items;
            }
        }
    }
}
