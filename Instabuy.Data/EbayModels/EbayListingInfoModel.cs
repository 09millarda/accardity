using System;
using System.Collections.Generic;

namespace Instabuy.Data
{
    public class EbayListingInfoModel
    {
        public List<bool> BestOfferEnabled { get; set; } = new List<bool>();
        public List<bool> BuyItNowAvailable { get; set; } = new List<bool>();
        public List<DateTime> StartTime { get; set; } = new List<DateTime>();
        public List<DateTime> EndTime { get; set; } = new List<DateTime>();
        public List<string> ListingType { get; set; } = new List<string>();
        public List<int> WatchCount { get; set; } = new List<int>();
    }
}