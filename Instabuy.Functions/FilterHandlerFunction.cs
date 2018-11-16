using Instabuy.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.Text;
using System.Collections.Generic;

namespace Instabuy.Functions
{
    public static class FilterHandlerFunction
    {
        private static IServiceProvider _container = new ContainerBuilder().RegisterModule<CoreAppModule>().Build();

        [FunctionName("FilterHandlerFunctionHttp")]
        public static Task RunHttp([HttpTrigger(AuthorizationLevel.Function, "get", Route = null)]HttpRequest req) => Run((TimerInfo)null);

        [FunctionName("FilterHandlerFunction")]
        public static async Task Run([TimerTrigger("0 */1 * * * *")]TimerInfo timer)
        {
            var filtersRepository = _container.GetService<IFiltersRepository>();
            var httpClient = _container.GetService<HttpClient>();
            var functionSettings = _container.GetService<FunctionsSettingsModel>();

            var filters = await filtersRepository.Get().ConfigureAwait(false);

            var postings = new List<Task<HttpResponseMessage>>();
            foreach (var filter in filters)
            {
                var filterPostBody = new FilterPostBodyModel
                {
                    filter = filter.FilterString,
                    filterId = filter.FilterId
                };

                var postBody = new StringContent(JsonConvert.SerializeObject(filterPostBody), Encoding.UTF8, "application/json");

                postings.Add(httpClient.PostAsync(functionSettings.EbaySearchFunctionUrl, postBody));
            }

            Task.WhenAll(postings);
        }
    }
}
