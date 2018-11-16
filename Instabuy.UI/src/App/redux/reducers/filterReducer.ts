import { IFilterState, IEbayCategoryModel } from "src/App/index";
import { AnyAction } from 'redux';
import { FETCH_FILTER_HISTORY_SUMMARY, RECEIVED_FILTER_HISTORY_SUMMARY, RECEIVED_CATEGORY_LEVEL_VALUE, IS_FETCHING_CHILD_CATEGORIES, RECEIVED_CATEGORIES, CATEGORY_LEVEL_ALTERED } from '../actions/filterActions';

export const initialFilterState: IFilterState = {
  createFilterState: {
    filterHistorySummary: [],
    isFetchingFilterHistorySummary: false,
    ebayCategoryHierarchy: [],
    ebayCategoryWizardValues: [],
    categoryLevelsAllowed: 4,
    isFetchingCategories: false
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
    default:
      return state;
  }
}

export default reducer;