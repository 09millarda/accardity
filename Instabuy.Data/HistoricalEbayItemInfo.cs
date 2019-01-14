using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class HistoricalEbayItemInfo
    {
        public int ItemId { get; set; }
        public string Title { get; set; }
        public decimal SellPrice { get; set; }
        public string CategoryName { get; set; }
        public string Location { get; set; }
        public string Country { get; set; }
        public decimal ShippingCost { get; set; }
        public bool? ReturnsAccepted { get; set; }
        public bool? TopRatedListing { get; set; }
        public DateTimeOffset ListingStart { get; set; }
        public DateTimeOffset ListingEnd { get; set; }
        public string GalleryUrl { get; set; }
        public string EbayProductId { get; set; }
        public bool? BuyItNowAvailable { get; set; }
        public string Condition { get; set; }
    }
}
