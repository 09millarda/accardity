using System.Collections.Generic;

namespace Instabuy.Data
{
    public class EbayShippingInfoModel
    {
        public List<EbayPriceModel> ShippingServiceCost { get; set; } = new List<EbayPriceModel>();
        public List<string> ShippingType { get; set; } = new List<string>();
        public List<string> ShipToLocations { get; set; } = new List<string>();
        public List<bool> ExpeditedShipping { get; set; } = new List<bool>();
        public List<bool> OneDayShippingAvailable { get; set; } = new List<bool>();
        public List<int> HandlingTime { get; set; } = new List<int>();
    }
}