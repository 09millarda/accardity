using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data.FullItem.Processed
{
    public class EbayItemModel
    {
        public bool BestOfferEnabled { get; set; }
        public string Description { get; set; }
        public long ItemId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string ListingUrl { get; set; }
        public string ListingType { get; set; }
        public string Location { get; set; }
        public IEnumerable<string> PaymentMethods { get; set; }
        public string GalleryUrl { get; set; }
        public IEnumerable<string> PictureUrls { get; set; }
        public string Postcode { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public SellerModel Seller { get; set; }
        public int? BidCount { get; set; }
        public PriceModel ConvertedCurrentPrice { get; set; }
        public PriceModel CurrentPrice { get; set; }
        public string ListingStatus { get; set; }
        public int QuantitySold { get; set; }
        public IEnumerable<string> ShipToLocations { get; set; }
        public string EbaySite { get; set; }
        public TimeSpan TimeLeft { get; set; }
        public string Title { get; set; }
        public IEnumerable<ItemSpecifics> ItemSpecifics { get; set; }
        public int HitCount { get; set; }
        public string Country { get; set; }
        public PriceModel MinimumToBid { get; set; }
        public bool ReturnsAccepted { get; set; }
        public string ProductId { get; set; }
        public bool AutoPay { get; set; }
        public int HandlingTime { get; set; }
        public int ConditionId { get; set; }
        public string ConditionDisplayName { get; set; }
        public bool GlobalShipping { get; set; }
    }
}
