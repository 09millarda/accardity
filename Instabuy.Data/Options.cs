using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class Options
    {
        public EbaySettings EbaySettings { get; set; }
    }

    public class EbaySettings
    {
        public string ApiKey { get; set; }
    }
}
