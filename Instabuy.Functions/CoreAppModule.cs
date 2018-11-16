using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Text;
using Instabuy.Azure;
using Instabuy.Data;
using Instabuy.Data.Sql;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Instabuy.Functions
{
    internal class CoreAppModule : Module
    {
        public override void Load(IServiceCollection services)
        {
            var config = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .Build();

            services.AddSingleton(options => new FunctionsSettingsModel
            {
                AzureSqlConnectionString = config["Azure_Sql_Connection_String"],
                AzureCloudStorageConnectionString = config["AzureWebJobsStorage"],
                EbayBaseUrl = config["EbayApiBaseUrl"],
                EbaySearchFunctionUrl = config["EbaySearchFunctionUrl"]
            })
                .AddTransient(options => new InstabuyDbContext(options.GetService<FunctionsSettingsModel>().AzureSqlConnectionString))
                .AddTransient(options => new CloudStorageContext(options.GetService<FunctionsSettingsModel>().AzureCloudStorageConnectionString))
                .AddSingleton<HttpClient>()
                .AddRepositories()
                .AddAzureServices();
        }
    }
}
