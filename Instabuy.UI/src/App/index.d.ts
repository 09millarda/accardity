import { Moment } from 'moment-timezone';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction } from 'redux';

export interface IBreadcrumbItem {
  name: string;
  to: string;
}

export type ThunkResult<R> = ThunkAction<R, IReduxState, undefined, Action>;
export type Dispatch<R> = ThunkDispatch<R, {}, AnyAction>;
export type EbayCategoryLevel = 0 | 1 | 2 | 3;

export type ItemFilterNames = 'AvailableTo' | 'BestOfferOnly' | 'CharityOnly' | 'Condition' | 'Currency' | 'EndTimeFrom' | 'EndTimeTo' | 'ExcludeAutoPay' | 'ExcludeCategory' | 'ExcludeSeller' | 'ExpeditedShippingType' | 'FeaturedOnly' | 'FeedbackScoreMax' | 'FeedbackScoreMin' | 'FreeShippingOnly' | 'GetItFastOnly' | 'HideDuplicateItems' | 'ListedIn' | 'ListingType' | 'LocalPickupOnly' | 'LocalSearchOnly' | 'LocatedIn' | 'LotsOnly' | 'MaxBids' | 'MaxDistance' | 'MaxHandlingTime' | 'MaxPrice' | 'MaxQuantity' | 'MinBids' | 'MinPrice' | 'MinQuantity' | 'ModTimeFrom' | 'PaymentMethod' | 'ReturnsAcceptedOnly' | 'Seller' | 'SellerBusinessType' | 'TopRatedSellerOnly' | 'ValueBoxInventory' | 'WorldOfGoodOnly';

export interface IReduxState {
  filterState: IFilterState;
  common: ICommonState;
}

export interface ICommonState {
  ebayItemConditions: IConditionModel[];
}

export interface IConditionModel {
  name: string;
  id: number;
}

export interface IFilterState {
  createFilterState: ICreateFilterState;
}

export interface ICreateFilterState {
  isFetchingFilterHistorySummary: boolean;
  filterHistorySummary: IEbayItem[];
  ebayCategoryHierarchy: IEbayCategoryModel[][];
  categoryLevelsAllowed: number;
  ebayCategoryWizardValues: string[];
  isFetchingCategories: boolean;
}

export interface IEbayCategoryModel {
  categoryName: string;
  categoryID: number;
  leafCategory: string;
  categoryParentID: number;
}

export interface IEbayItem {
  itemId: string;
  title: string;
  globalId: string;
  primaryCategory: IEbayCategory;
  galleryUrl: string;
  productId: IEbayProductId;
  paymentMethod: string;
  location: string;
  country: string;
  shippingInfo: IEbayShippingInfo;
  listingInfo: IEbayListingInfo;
  sellingStatus: IEbaySellingStatus;
  returnsAccepted: boolean;
  condition: IEbayCondition;
  topRatedListing: boolean;
  isMultiVariationListing: boolean;
}

export interface IEbaySellingStatus {
  convertedCurrentPrice: IEbayPriceModel;
  currentPrice: IEbayPriceModel;
  sellingState: string;
}

export interface IEbayPriceModel {
  currencyId: string;
  value: number;
}

export interface IEbayListingInfo {
  bestOfferEnabled: boolean;
  buyItNowAvailable: boolean;
  startTime: Moment;
  endTime: Moment;
  listingType: string;
  watchCount: number;
}

export interface IEbayShippingInfo {
  shippingServiceCost: IEbayCost;
  shippingType: string;
  shipToLocations: string[];
  expeditedShipping: boolean;
  oneDayShippingAvailable: boolean;
  handlingTime: number;
}

export interface IEbayCost {
  currencyId: string;
  value: number;
}

export interface IEbayCategory {
  categoryId: string;
  categoryName: string;
}

export interface IEbayCondition {
  conditionId: number;
  conditionDisplayName: string;
}

export interface IEbayProductId {
  type: string;
  value: string;
}