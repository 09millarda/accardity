using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class EbayShippingInfoModelNormalized
    {
        public EbayPriceModelNormalized ShippingServiceCost { get; set; }
        public string ShippingType { get; set; }
        public IEnumerable<string> ShipToLocations { get; set; }
        public bool? ExpeditedShipping { get; set; }
        public bool? OneDayShippingAvailable { get; set; }
        public int? HandlingTime { get; set; }
    }
}
