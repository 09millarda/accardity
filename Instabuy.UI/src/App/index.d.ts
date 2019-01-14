import moment, { Moment } from 'moment-timezone';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction } from 'redux';

declare module "*.json" {
  const value: any;
  export default value;
}

export type CreateFilterStep = 'DESIGN_BASE_FILTER' | 'REFINE_FILTER' | 'REPORT';

export type ContextDispatch = (action: AnyAction) => void;

export type Dispatch<TState> = React.Dispatch<TState>;

export interface IFilterCreateFormData {
  categories: IEbayCategoryModel[];
  keywords: string;
  conditions: number[];
  priceMin?: number;
  priceMax?: number;
  minUserFeedback?: number;
  binOnly: boolean;
}

export interface IFilterCreateStatisticalData {
  sd: number;
  sdMultiplier: number;
  items: IEbayItem[];
  itemsPriceDesc: IEbayItem[];
  meanPrice: number;
  priceMin: number;
  priceMax: number;
  regressionGradient: number;
  regressionYIntercept: number;
  itemsByDay: Map<string, IEbayItem[]>;
}

export interface IFilterCreateHotOrNotData {
  hotItemIds: number[];
  notHotItemIds: number[];
}

export interface IFilterCreateRefinedFilter {
  formData: IFilterCreateFormData;
  responseItems: IEbayItem[];
  statisticalData: IFilterCreateStatisticalData;
  fullItemEbayItemIds: number[];
  hotOrNotData: IFilterCreateHotOrNotData;
  isFetchingItems: boolean;
  formChanged: boolean;
}

export interface IFilterCreateContext {
  fullItems: IEbayItemFull[];
  refinedFilterHistory: IFilterCreateRefinedFilter[];
  dispatch: ContextDispatch;
  step: CreateFilterStep;
}

export interface IBreadcrumbItem {
  name: string;
  to: string;
}

export interface I2DCoord {
  x: number;
  y: number;
}

export interface IGroupedByDateItems {
  date: string;
  items: IEbayItem[];
}

export type ThunkResult<R> = ThunkAction<R, IReduxState, undefined, Action>;
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
  manageFilterState: IManageFilterState;
}

export interface IManageFilterState {
  filters: IFilter[];
  isFetchingFilters: boolean;
  isFetchingFullFilter: boolean;
  fullFilter?: IFullFilter;
}

export interface IFullFilter {
  filter: IFilter;
  historicalItems: IHistoricalEbayItemInfo[];
}

export interface IHistoricalEbayItemInfo {
  itemId: number;
  title: string;
  sellPrice: number;
  categoryId: number;
  location: string;
  country: string;
  shippingCost: string;
  returnsAccepted?: boolean;
  topRatedListing?: boolean;
  start: Moment;
  end: Moment;
}

export interface IFilter {
  active: boolean;
  categories: number[];
  categoryId: number;
  conditions: number[];
  created: Moment;
  executionCount: number;
  filterId: number;
  keywords: string;
  lastExecuted: Moment;
  lastUpdated: Moment;
  name: string;
  period: number;
}

export interface IEbayUser {
  userId: string;
  feedbackStarColor: string;
  feedbackScore: number;
  positiveFeedbackPercent: number;
}

export interface IEbayItemSpecific {
  name: string;
  values: string[];
}

export interface IEbayItemFull {
  bestOfferEnabled: boolean;
  description: string;
  itemId: number;
  startTime: Moment;
  endTime: Moment;
  listingUrl: string;
  listingType: string;
  location: string;
  paymentMethods: string[];
  galleryUrl: string;
  pictureUrls: string[];
  postcode: string;
  categoryId: number;
  categoryName: string;
  seller: IEbayUser;
  bidCount?: number;
  convertedCurrentPrice: IEbayPriceModel;
  currentPrice: IEbayPriceModel;
  listingStatus: string;
  quantitySold: number;
  shipToLocations: string[];
  ebaySite: string;
  timeLeft: moment.Duration;
  title: string;
  itemSpecifics: IEbayItemSpecific[];
  hitCount: number;
  country: string;
  minimumToBid: IEbayPriceModel;
  returnsAccepted: boolean;
  productId: string;
  autoPay: boolean;
  handlingTime: number;
  conditionId: number;
  conditionDisplayName: string;
  globalShipping: boolean;
}

export interface IFilterInfo {
  categoryPath: string;
  keywords: string;
  conditions: number[];
  minPrice?: number;
  maxPrice?: number;
  minUserFeedback?: number;
}

export interface IFilterStatistics {
  sd: number;
  sdMultipler: number;
  sdItems: IEbayItem[];
  meanPriceIncShipping: number;
  meanPrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface IFilterSummary {
  items: IEbayItem[];
  statistics: IFilterStatistics;
  fullItems: IEbayItemFull[];
  filter?: IFilterInfo;
  isFetchingItems: boolean;
  isFetchingFullItems: boolean;
}

export interface ICreateFilterState {
  isFetchingFilterHistorySummary: boolean;
  baseFilterHistorySummary: IFilterSummary;
  filterHistorySummary: IEbayItem[];
  ebayCategoryHierarchy: IEbayCategoryModel[][];
  categoryLevelsAllowed: number;
  ebayCategoryWizardValues: string[];
  isFetchingCategories: boolean;
  items: IEbayItemFull[];
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
  subtitle: string;
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