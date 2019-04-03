using Instabuy.Data.EbayModels.Aspect_Histogram;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

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

        public static FullItem.Processed.FullItemModel Normalize(this FullItem.Raw.FullItemModel responseModel)
        {
            return new FullItem.Processed.FullItemModel
            {
                TimeStamp = responseModel.Timestamp,
                Items = responseModel.Item.Select(i => new FullItem.Processed.EbayItemModel
                {
                    AutoPay = i.AutoPay,
                    BestOfferEnabled = i.BestOfferEnabled,
                    BidCount = i.BidCount,
                    CategoryId = i.PrimaryCategoryId,
                    CategoryName = i.PrimaryCategoryName,
                    ConditionDisplayName = i.ConditionDisplayName,
                    ConditionId = i.ConditionId,
                    ConvertedCurrentPrice = i.ConvertedCurrentPrice == null ? null : new FullItem.Processed.PriceModel
                    {
                        CurrencyId = i.ConvertedCurrentPrice.CurrencyId,
                        Value = i.ConvertedCurrentPrice.Value
                    },
                    Country = i.Country,
                    CurrentPrice = i.CurrentPrice == null ? null : new FullItem.Processed.PriceModel
                    {
                        CurrencyId = i.CurrentPrice.CurrencyId,
                        Value = i.CurrentPrice.Value
                    },
                    Description = i.Description,
                    EbaySite = i.Site,
                    EndTime = i.EndTime,
                    GalleryUrl = i.GalleryURL,
                    GlobalShipping = i.GlobalShipping,
                    HandlingTime = i.HandlingTime,
                    HitCount = i.HitCount,
                    ItemId = long.Parse(i.ItemId),
                    ListingStatus = i.ListingStatus,
                    ItemSpecifics = i.ItemSpecifics == null ? null : i.ItemSpecifics.NameValueList.Select(n => new FullItem.Processed.ItemSpecifics
                    {
                        Name = n.Name,
                        Values = n.Value
                    }),
                    ListingType = i.ListingType,
                    ListingUrl = i.ViewItemURLForNaturalSearch,
                    Location = i.Location,
                    MinimumToBid = i.MinimumToBid == null ? null : new FullItem.Processed.PriceModel
                    {
                        CurrencyId = i.MinimumToBid.CurrencyId,
                        Value = i.MinimumToBid.Value
                    },
                    PaymentMethods = i.PaymentMethods,
                    PictureUrls = i.PictureURL,
                    Postcode = i.PostalCode,
                    ProductId = i.PostalCode,
                    QuantitySold = i.QuantitySold,
                    Seller = i.Seller == null ? null : new FullItem.Processed.SellerModel
                    {
                        FeedbackScore = i.Seller.FeedbackScore,
                        FeedbackStarColor = i.Seller.FeedbackRatingStar,
                        PositiveFeedbackPercent = i.Seller.PositiveFeedbackPercent,
                        UserId = i.Seller.UserId
                    },
                    ShipToLocations = i.ShipToLocations,
                    StartTime = i.StartTime,
                    TimeLeft = XmlConvert.ToTimeSpan(i.TimeLeft),
                    Title = i.Title,
                    ReturnsAccepted = i.ReturnPolicy == null ? false : i.ReturnPolicy.ReturnsAccepted != "ReturnsNotAccepted"
                }).ToList()
            };
        }

        public static IEnumerable<AspectHistogram> Normalize(this GetHistogramsResponseResponse res)
        {
            var aspects = res.GetHistogramsResponse.First()
                .AspectHistogramContainer.First().Aspect
                .Select(a => new AspectHistogram
                {
                    AspectName = a.Name,
                    Aspects = a.ValueHistogram.Select(v => new Aspect
                    {
                        Name = v.ValueName,
                        Count = v.Count.First()
                    }).OrderByDescending(b => b.Count)
                });

            return aspects;
        }
    }
}
