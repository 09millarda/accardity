using System;
using System.Collections.Generic;

namespace Instabuy.Data.FullItem.Raw
{
    public class EbayItemModel
    {
        public bool BestOfferEnabled { get; set; }
        public string Description { get; set; }
        public string ItemId { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime StartTime { get; set; }
        public string ViewItemURLForNaturalSearch { get; set; }
        public string ListingType { get; set; }
        public string Location { get; set; }
        public List<string> PaymentMethods { get; set; } = new List<string>();
        public string GalleryURL { get; set; }
        public List<string> PictureURL { get; set; } = new List<string>();
        public string PostalCode { get; set; }
        public int PrimaryCategoryId { get; set; }
        public string PrimaryCategoryName { get; set; }
        public int Quantity { get; set; }
        public SellerModel Seller { get; set; }
        public int? BidCount { get; set; }
        public PriceModel ConvertedCurrentPrice { get; set; }
        public PriceModel CurrentPrice { get; set; }
        public BidderModel HighBidder { get; set; }
        public string ListingStatus { get; set; }
        public int QuantitySold { get; set; }
        public List<string> ShipToLocations { get; set; } = new List<string>();
        public string Site { get; set; }
        public string TimeLeft { get; set; }
        public string Title { get; set; }
        public ItemSpecificsModel ItemSpecifics { get; set; }
        public int HitCount { get; set; }
        public string PrimaryCategoryPath { get; set; }
        public string Country { get; set; }
        public ReturnPolicyModel ReturnPolicy { get; set; }
        public PriceModel MinimumToBid { get; set; }
        public ProductIdModel ProductID { get; set; }
        public bool AutoPay { get; set; }
        public int HandlingTime { get; set; }
        public int ConditionId { get; set; }
        public string ConditionDescription { get; set; }
        public string ConditionDisplayName { get; set; }
        public bool GlobalShipping { get; set; }
        public int QuantitySoldByPickupInStore { get; set; }
        public bool NewBestOffer { get; set; }
        public bool AvailableForPickupDropOff { get; set; }
    }
}
