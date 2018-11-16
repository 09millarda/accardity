using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class FunctionsSettingsModel
    {
        public string AzureSqlConnectionString { get; set; }
        public string AzureCloudStorageConnectionString { get; set; }
        public string EbayBaseUrl { get; set; }
        public string EbaySearchFunctionUrl { get; set; }
    }
}
