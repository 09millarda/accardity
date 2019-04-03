using System;

namespace Instabuy.Data
{
    public class EbayHistoricalSaleModel
    {
        public long ItemId { get; set; }
        public decimal SellPrice { get; set; }
        public DateTime DateTimeSold { get; set; }
        public TimeSpan TimeListed { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal TotalCost { get; set; }
    }
}