using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class EbayHistoricalSaleModelNormalized
    {
        public long ItemId { get; set; }
        public decimal SellPrice { get; set; }
        public DateTime DateTimeSold { get; set; }
        public TimeSpan TimeListed { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal TotalCost { get; set; }
    }
}
