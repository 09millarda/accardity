import { ThunkResult, IEbayItem, IEbayCategoryModel } from 'src/App/index';
import { getDataUrl } from 'src/App/common/endpointControl';
import { AnyAction } from 'redux';

export const FETCH_FILTER_HISTORY_SUMMARY = 'FETCH_FILTER_HISTORY_SUMMARY';
export const RECEIVED_FILTER_HISTORY_SUMMARY = 'RECEIVED_FILTER_HISTORY_SUMMARY';
export const RECEIVED_CATEGORY_LEVEL_VALUE = 'RECEIVED_CATEGORY_LEVEL_VALUE';
export const GET_CHILD_CATEGORIES = 'GET_CHILD_CATEGORIES';
export const IS_FETCHING_CHILD_CATEGORIES = 'IS_FETCHING_CHILD_CATEGORIES';
export const RECEIVED_CATEGORIES = 'RECEIVED_CATEGORIES';
export const CATEGORY_LEVEL_ALTERED = 'CATEGORY_LEVEL_ALTERED';

const receivedFilterHistorySummary = (items: IEbayItem[]): AnyAction => {
  return {
    type: RECEIVED_FILTER_HISTORY_SUMMARY,
    items
  };
};

const receivedChildCategories = (categories: IEbayCategoryModel[], level: number): AnyAction => {
  return {
    type: RECEIVED_CATEGORIES,
    categories,
    level
  };
};

export function getFilterHistorySummary(categoryId: number, filterString: string, conditions: number[], daysBack: number): ThunkResult<void> {
  return (dispatch) => {
    dispatch({
      type: FETCH_FILTER_HISTORY_SUMMARY
    });
    getDataUrl()
      .then((url) => fetch(`${url}/ebay/history/${categoryId}/${filterString}/${conditions.join(',')}/${daysBack}`)
      .then((res) => res.json())
      .then((json) => dispatch(receivedFilterHistorySummary(json))));
  };
}

export function addCategoryLevelValue(categoryName: string, level: number): AnyAction {
  return {
    type: RECEIVED_CATEGORY_LEVEL_VALUE,
    level,
    categoryName
  };
}

export function categoryLevelAltered(level: number): AnyAction {
  return {
    type: CATEGORY_LEVEL_ALTERED,
    level
  }
}

export function getChildCategories(categoryId: number, level: number): ThunkResult<void> {
  return (dispatch) => {
    dispatch({
      type: IS_FETCHING_CHILD_CATEGORIES
    });
    getDataUrl()
      .then((url) => fetch(`${url}/ebay/category/${categoryId}`)
      .then((res) => res.json())
      .then((json) => dispatch(receivedChildCategories(json, level))));
  }
}