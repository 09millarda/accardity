using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class EbayItemModelNormalized
    {
        public string ItemId { get; set; }
        public string Title { get; set; }
        public string GlobalId { get; set; }
        public string Subtitle { get; set; }
        public EbayCategoryModelNormalized PrimaryCategory { get; set; }
        public string GalleryUrl { get; set; }
        public EbayProductIdModelNormalized ProductId { get; set; }
        public string PaymentMethod { get; set; }
        public string Location { get; set; }
        public string Country { get; set; }
        public EbayShippingInfoModelNormalized ShippingInfo { get; set; }
        public EbayListingInfoModelNormalized ListingInfo { get; set; }
        public bool? ReturnsAccepted { get; set; }
        public EbayConditionModelNormalized Condition { get; set; }
        public bool? TopRatedListing { get; set; }
        public bool? IsMultiVariationListing { get; set; }
        public EbaySellingStatusModelNormalized SellingStatus { get; set; }
    }
}
