using Instabuy.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Azure
{
    public static class CommonServices
    {
        public static IServiceCollection AddAzureServices(this IServiceCollection services)
        {
            services.AddTransient<IAzureQueueRepository>(options => new AzureQueueRepository(options.GetService<CloudStorageContext>()));

            return services;
        }
    }
}
