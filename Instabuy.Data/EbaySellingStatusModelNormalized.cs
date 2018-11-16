using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class EbaySellingStatusModelNormalized
    {
        public EbayPriceModelNormalized CurrentPrice { get; set; }
        public EbayPriceModelNormalized ConvertedCurrentPrice { get; set; }
        public string SellingState { get; set; }
        public TimeSpan? TimeLeft { get; set; }
    }
}
