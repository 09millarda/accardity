using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public enum EbaySearchFilters
    {
        categoryId,
        descriptionSearch,
        itemFilter_authorizedSellerOnly,
        itemFilter_availableTo,
        itemFilter_bestOfferOnly,
        itemFilter_condition,
        itemFilter_currency,
        itemFilter_endTimeFrom,
        itemFilter_endTimeTo,
        itemFilter_excludeAutoPay,
        itemFilter_excludeCategory,
        itemFilter_excludeSeller,
        itemFilter_expeditedShippingType,
        itemFilter_featuredOnly,
        itemFilter_feedbackScoreMax,
        itemFilter_feedbackScoreMin,
        itemFilter_freeShippingOnly,
        itemFilter_getItFastOnly,
        itemFilter_hideDuplicateItems,
        itemFilter_listedIn,
        itemFilter_listingType,
        itemFilter_localPickupOnly,
        itemFilter_localSearchOnly,
        itemFilter_locatedIn,
        itemFilter_lotsOnly,
        itemFilter_maxBids,
        itemFilter_maxDistance,
        itemFilter_maxHandlingTime,
        itemFilter_maxPrice,
        itemFilter_maxQuantity,
        itemFilter_minBids,
        itemFilter_minPrice,
        itemFilter_minQuantity,
        itemFilter_modTimeFrom,
        itemFilter_outletSellerOnly,
        itemFilter_paymentMethod,
        itemFilter_returnsAcceptedOnly,
        itemFilter_seller,
        itemFilter_sellerBusinessType,
        itemFilter_soldItemsOnly,
        itemFilter_startTimeFrom,
        itemFilter_startTimeTo,
        itemFilter_topRatedSellerOnly,
        keywords,
        buyerPostalCode,
        paginationInput_entriesPerPage,
        paginationInput_pageNumber,
        sortOrder
    }

    public enum sortOrder
    {
        BidCountFewest,
        BidCountMost,
        CountryAscending,
        CountryDescending,
        CurrentPriceHighest,
        DistanceNearest,
        EndTimeSoonest,
        PricePlusShippingHighest,
        PricePlusShippingLowest,
        StartTimeNewest,
        WatchCountDecreaseSort
    }

    public enum itemFilter_condition
    {
        New = 1000,
        NewOtherSeeDetails = 1500,
        NewWithDefects = 1750,
        ManufacturerRefurbished = 2000,
        SellerRefurbished = 2500,
        Used = 3000,
        VeryGood = 4000,
        Good = 5000,
        Acceptable = 6000,
        ForPartsOrNotWorking = 7000
    }

    public enum itemFilter_expeditedShippingType
    {
        Expedited,
        OneDayShippinh
    }

    public enum itemFilter_listingType
    {
        Auction,
        AuctionWithBIN,
        Classified,
        FixedPrice,
        StoreInventory,
        All
    }

    public enum itemFilter_paymentMethod
    {
        PayPal,
        PaisaPay,
        PaisaPayEMI
    }
}
