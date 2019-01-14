import { IFilterState, IEbayCategoryModel, IEbayItemFull } from "src/App/index";
import { AnyAction } from 'redux';
import { FETCH_FILTER_HISTORY_SUMMARY, RECEIVED_FILTER_HISTORY_SUMMARY, RECEIVED_CATEGORY_LEVEL_VALUE, IS_FETCHING_CHILD_CATEGORIES, RECEIVED_CATEGORIES, CATEGORY_LEVEL_ALTERED, IS_FETCHING_FILTERS, RECEIVED_FILTERS, IS_FETCHING_FULL_FILTER, RECEIVED_FULL_FILTER, RECEIVED_FULL_ITEMS, RECEIVED_BASE_FILTER_HISTORY, FETCH_BASE_FILTER_HISTORY } from '../actions/filterActions';

export const initialFilterState: IFilterState = {
  createFilterState: {
    baseFilterHistorySummary: {
      fullItems: [],
      items: [],
      isFetchingItems: false,
      isFetchingFullItems: false,
      statistics: {
        maxPrice: 0,
        meanPrice: 0,
        meanPriceIncShipping: 0,
        minPrice: 0,
        sd: 0,
        sdItems: [],
        sdMultipler: 0
      }
    },
    filterHistorySummary: [],
    isFetchingFilterHistorySummary: false,
    ebayCategoryHierarchy: [],
    ebayCategoryWizardValues: [],
    categoryLevelsAllowed: 4,
    isFetchingCategories: false,
    items: []
  },
  manageFilterState: {
    filters: [],
    isFetchingFilters: false,
    isFetchingFullFilter: false
  }
};

const reducer = (state: IFilterState = initialFilterState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_FILTER_HISTORY_SUMMARY:
      return {...state, createFilterState: {...state.createFilterState, isFetchingFilterHistorySummary: true}};
    case RECEIVED_FILTER_HISTORY_SUMMARY:
      return {...state, createFilterState: {...state.createFilterState, isFetchingFilterHistorySummary: false, filterHistorySummary: action.items}};
    case RECEIVED_CATEGORY_LEVEL_VALUE:
      const receivedCategoryLevelValueCategoryValues = state.createFilterState.ebayCategoryWizardValues.slice();
      receivedCategoryLevelValueCategoryValues[action.level] = action.categoryName;
      return {...state, createFilterState: {...state.createFilterState, ebayCategoryWizardValues: receivedCategoryLevelValueCategoryValues}};
    case CATEGORY_LEVEL_ALTERED:
      const categoryLevelAlteredCategoryValues = state.createFilterState.ebayCategoryWizardValues.slice();
      const categoryHierarchyModels = state.createFilterState.ebayCategoryHierarchy.slice();
      
      return {...state, createFilterState: {...state.createFilterState, ebayCategoryWizardValues: categoryLevelAlteredCategoryValues.slice(0, action.level + 1), ebayCategoryHierarchy: categoryHierarchyModels.slice(0, action.level + 1)}};
    case IS_FETCHING_CHILD_CATEGORIES:
      return {...state, createFilterState: {...state.createFilterState, isFetchingCategories: true}};
    case RECEIVED_CATEGORIES:
      const categories: IEbayCategoryModel[] = action.categories;
      const forLevel: number = action.level;
      if (categories.length === 0) {
        return {...state, createFilterState: {...state.createFilterState, isFetchingCategories: false}};
      }
      const receivedCategoriesState: IFilterState = JSON.parse(JSON.stringify(state));
      
      receivedCategoriesState.createFilterState.isFetchingCategories = false;

      for (let i = 3; i > forLevel; i--) {
        receivedCategoriesState.createFilterState.ebayCategoryHierarchy[i] = [];
      }
      receivedCategoriesState.createFilterState.ebayCategoryHierarchy[forLevel] = categories;
      return receivedCategoriesState;
    case IS_FETCHING_FILTERS:
      return {...state, manageFilterState: {...state.manageFilterState, isFetchingFilters: true}};
    case RECEIVED_FILTERS:
      return {...state, manageFilterState: {...state.manageFilterState, isFetchingFilters: false, filters: action.filters}};
    case IS_FETCHING_FULL_FILTER:
      return {...state, manageFilterState: {...state.manageFilterState, isFetchingFullFilter: true}};
    case RECEIVED_FULL_FILTER:
      return {...state, manageFilterState: {...state.manageFilterState, isFetchingFullFilter: false, fullFilter: action.fullFilter}};
    case RECEIVED_FULL_ITEMS:
      const items = state.createFilterState.items.slice();
      const fullItems: IEbayItemFull[] = action.fullItems;

      for (const item of fullItems) {
        if (items.find((i) => i.itemId === item.itemId) == null) {
          items.push(item);
        }
      }

      return {...state, createFilterState: {...state.createFilterState, items}};
    case RECEIVED_BASE_FILTER_HISTORY:
      return {...state, createFilterState: {...state.createFilterState, baseFilterHistorySummary: {...state.createFilterState.baseFilterHistorySummary, items: action.items, isFetchingItems: false}}};
    case FETCH_BASE_FILTER_HISTORY:
      return {...state, createFilterState: {...state.createFilterState, baseFilterHistorySummary: {...state.createFilterState.baseFilterHistorySummary, isFetchingItems: true}}};
    default:
      return state;
  }
}

export default reducer;