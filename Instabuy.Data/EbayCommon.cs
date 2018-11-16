using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Instabuy.Data
{
    public static class EbayCommon
    {
        public static EbayResponseModelNormalized Normalize(this List<EbayResponseModel> responseModel)
        {
            return new EbayResponseModelNormalized
            {
                Ack = responseModel.First().Ack.First(),
                Timestamp = responseModel.First().Timestamp.First(),
                Version = responseModel.First().Version.First(),
                PaginationOutput = new EbayPaginationOutputModelNormalized
                {
                    EntriesPerPage = responseModel.First().PaginationOutput.First().EntriesPerPage.First(),
                    PageNumber = responseModel.First().PaginationOutput.First().PageNumber.First(),
                    TotalEntries = responseModel.First().PaginationOutput.First().TotalEntries.First(),
                    TotalPages = responseModel.First().PaginationOutput.First().TotalPages.First()
                },
                SearchResult = responseModel.First().SearchResult.FirstOrDefault() != null ? new EbaySearchResultModelNormalized
                {
                    Count = responseModel.First().SearchResult.FirstOrDefault() != null ? responseModel.First().SearchResult.First().Count : 0,
                    Items = responseModel.First().SearchResult.FirstOrDefault() != null ? responseModel.First().SearchResult.First().Item.Select(i => new EbayItemModelNormalized
                    {
                        Condition = i.Condition.FirstOrDefault() != null ? new EbayConditionModelNormalized
                        {
                            ConditionId = i.Condition.First().ConditionId.First(),
                            ConditionDisplayName = i.Condition.First().ConditionDisplayName.First()
                        } : null,
                        Country = i.Country.FirstOrDefault(),
                        GalleryUrl = i.GalleryURL.FirstOrDefault(),
                        GlobalId = i.GlobalId.FirstOrDefault(),
                        IsMultiVariationListing = i.IsMultiVariationListing.FirstOrDefault(),
                        ItemId = i.ItemId.FirstOrDefault(),
                        ListingInfo = i.ListingInfo.FirstOrDefault() != null ? new EbayListingInfoModelNormalized
                        {
                            BestOfferEnabled = i.ListingInfo.First().BestOfferEnabled.FirstOrDefault(),
                            BuyItNowAvailable = i.ListingInfo.First().BuyItNowAvailable.FirstOrDefault(),
                            EndTime = i.ListingInfo.First().EndTime.FirstOrDefault(),
                            ListingType = i.ListingInfo.First().ListingType.FirstOrDefault(),
                            StartTime = i.ListingInfo.First().StartTime.FirstOrDefault(),
                            WatchCount = i.ListingInfo.First().WatchCount.FirstOrDefault()
                        } : null,
                        Location = i.Location.FirstOrDefault(),
                        PaymentMethod = i.PaymentMethod.FirstOrDefault(),
                        PrimaryCategory = i.PrimaryCategory.FirstOrDefault() != null ? new EbayCategoryModelNormalized
                        {
                            CategoryId = i.PrimaryCategory.First().CategoryId.FirstOrDefault(),
                            CategoryName = i.PrimaryCategory.First().CategoryName.FirstOrDefault()
                        } : null,
                        ProductId = i.ProductId.FirstOrDefault() != null ? new EbayProductIdModelNormalized
                        {
                            Type = i.ProductId.First().Type,
                            Value = i.ProductId.First().Value
                        } : null,
                        ReturnsAccepted = i.ReturnsAccepted.FirstOrDefault(),
                        ShippingInfo = i.ShippingInfo.FirstOrDefault() != null ? new EbayShippingInfoModelNormalized
                        {
                            ExpeditedShipping = i.ShippingInfo.First().ExpeditedShipping.FirstOrDefault(),
                            HandlingTime = i.ShippingInfo.First().HandlingTime.FirstOrDefault(),
                            OneDayShippingAvailable = i.ShippingInfo.First().OneDayShippingAvailable.FirstOrDefault(),
                            ShippingServiceCost = i.ShippingInfo.First().ShippingServiceCost.FirstOrDefault() != null ? new EbayPriceModelNormalized
                            {
                                CurrencyId = i.ShippingInfo.First().ShippingServiceCost.First().CurrencyId,
                                Value = i.ShippingInfo.First().ShippingServiceCost.First().Value
                            } : null,
                            ShippingType = i.ShippingInfo.First().ShippingType.FirstOrDefault(),
                            ShipToLocations = i.ShippingInfo.First().ShipToLocations != null ? i.ShippingInfo.First().ShipToLocations.ToList() : null
                        } : null,
                        SellingStatus = i.SellingStatus.FirstOrDefault() != null ? new EbaySellingStatusModelNormalized
                        {
                            ConvertedCurrentPrice = i.SellingStatus.First().ConvertedCurrentPrice.FirstOrDefault() != null ? new EbayPriceModelNormalized
                            {
                                CurrencyId = i.SellingStatus.First().ConvertedCurrentPrice.First().CurrencyId,
                                Value = i.SellingStatus.First().ConvertedCurrentPrice.First().Value
                            } : null,
                            CurrentPrice = i.SellingStatus.First().CurrentPrice.FirstOrDefault() != null ? new EbayPriceModelNormalized
                            {
                                CurrencyId = i.SellingStatus.First().CurrentPrice.First().CurrencyId,
                                Value = i.SellingStatus.First().CurrentPrice.First().Value
                            } : null,
                            SellingState = i.SellingStatus.First().SellingState.FirstOrDefault(),
                            TimeLeft = null
                        } : null,
                        Subtitle = i.Subtitle.FirstOrDefault(),
                        Title = i.Title.FirstOrDefault(),
                        TopRatedListing = i.TopRatedListing.FirstOrDefault()
                    }) : null
                } : null
            };
        }
    }
}
