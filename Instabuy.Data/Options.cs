using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class Options
    {
        public EbaySettings EbaySettings { get; set; }
        public DatabaseSettings DatabaseSettings { get; set; }
    }

    public class EbaySettings
    {
        public string ApiKey { get; set; }
    }

    public class DatabaseSettings
    {
        public string ConnectionString { get; set; }
    }
}
