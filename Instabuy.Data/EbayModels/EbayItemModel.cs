using System.Collections.Generic;

namespace Instabuy.Data
{
    public class EbayItemModel
    {
        public List<string> ItemId { get; set; } = new List<string>();
        public List<string> Title { get; set; } = new List<string>();
        public List<string> GlobalId { get; set; } = new List<string>();
        public List<string> Subtitle { get; set; } = new List<string>();
        public List<EbayCategoryModel> PrimaryCategory { get; set; } = new List<EbayCategoryModel>();
        public List<string> GalleryURL { get; set; } = new List<string>();
        public List<string> ViewItemURL { get; set; } = new List<string>();
        public List<EbayProductIdModel> ProductId { get; set; } = new List<EbayProductIdModel>();
        public List<string> PaymentMethod { get; set; } = new List<string>();
        public List<string> Location { get; set; } = new List<string>();
        public List<string> Country { get; set; } = new List<string>();
        public List<EbayShippingInfoModel> ShippingInfo { get; set; } = new List<EbayShippingInfoModel>();
        public List<EbaySellingStatusModel> SellingStatus { get; set; } = new List<EbaySellingStatusModel>();
        public List<EbayListingInfoModel> ListingInfo { get; set; } = new List<EbayListingInfoModel>();
        public List<bool> ReturnsAccepted { get; set; } = new List<bool>();
        public List<EbayConditionModel> Condition { get; set; } = new List<EbayConditionModel>();
        public List<bool> TopRatedListing { get; set; } = new List<bool>();
        public List<bool> IsMultiVariationListing { get; set; } = new List<bool>();
        public List<EbaySellerInfoModel> SellerInfo { get; set; } = new List<EbaySellerInfoModel>();
    }
}