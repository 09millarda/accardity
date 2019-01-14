using System;
using Instabuy.Data;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;

namespace Instabuy.Functions
{
    public static class EbaySearchFunction
    {
        private static IServiceProvider _container = new ContainerBuilder().RegisterModule<CoreAppModule>().Build();

        //[FunctionName("EbaySearchFunction")]
        //public static async Task Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequestMessage req)
        //{
        //    var sqlFiltersRepository = _container.GetService<IFiltersRepository>();
        //    var functionSettings = _container.GetService<FunctionsSettingsModel>();
        //    var client = _container.GetService<HttpClient>();

        //    FilterPostBodyModel filter = null;

        //    try
        //    {
        //        filter = await req.Content.ReadAsAsync<FilterPostBodyModel>();
        //    }
        //    catch (Exception e)
        //    {
        //        throw new Exception(e.Message);
        //    }

        //    await sqlFiltersRepository.Counter(filter.filterId).ConfigureAwait(false);

        //    var ebayBaseUrl = $"{functionSettings.EbayBaseUrl}{filter.filter}";

        //    using (var res = await client.GetAsync(ebayBaseUrl).ConfigureAwait(false))
        //    {
        //        var serializedResult = await res.Content.ReadAsStringAsync().ConfigureAwait(false);
        //        var result = JsonConvert.DeserializeObject<EbayFindItemsByKeywordsResponse>(serializedResult);
        //    }
        //}
    }
}
