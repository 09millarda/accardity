using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class EbayListingInfoModelNormalized
    {
        public bool? BestOfferEnabled { get; set; }
        public bool? BuyItNowAvailable { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string ListingType { get; set; }
        public int? WatchCount { get; set; }
    }
}
