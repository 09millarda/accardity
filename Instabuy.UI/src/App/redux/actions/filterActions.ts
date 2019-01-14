import { ThunkResult, IEbayItem, IEbayCategoryModel, IFilter, IFullFilter, IEbayItemFull } from 'src/App/index';
import { getDataUrl } from 'src/App/common/endpointControl';
import { AnyAction } from 'redux';

export const FETCH_FILTER_HISTORY_SUMMARY = 'FETCH_FILTER_HISTORY_SUMMARY';
export const RECEIVED_FILTER_HISTORY_SUMMARY = 'RECEIVED_FILTER_HISTORY_SUMMARY';
export const RECEIVED_CATEGORY_LEVEL_VALUE = 'RECEIVED_CATEGORY_LEVEL_VALUE';
export const GET_CHILD_CATEGORIES = 'GET_CHILD_CATEGORIES';
export const IS_FETCHING_CHILD_CATEGORIES = 'IS_FETCHING_CHILD_CATEGORIES';
export const RECEIVED_CATEGORIES = 'RECEIVED_CATEGORIES';
export const CATEGORY_LEVEL_ALTERED = 'CATEGORY_LEVEL_ALTERED';
export const IS_CREATING_FILTER = 'IS_CREATING_FILTER';
export const CREATED_FILTER = 'CREATED_FILTER';
export const IS_FETCHING_FILTERS = 'IS_FETCHING_FILTERS';
export const RECEIVED_FILTERS = 'RECEIVED_FILTERS';
export const IS_FETCHING_FULL_FILTER = 'IS_FETCHING_FULL_FILTER0';
export const RECEIVED_FULL_FILTER = 'RECEIVED_FULL_FILTER';
export const RECEIVED_FULL_ITEMS = 'RECEIVED_FULL_ITEMS';
export const FETCH_BASE_FILTER_HISTORY = 'FETCH_BASE_FILTER_HISTORY';
export const RECEIVED_BASE_FILTER_HISTORY = 'RECEIVED_BASE_FILTER_HISTORY';

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

const receivedFilters = (filters: IFilter[]): AnyAction => {
  return {
    type: RECEIVED_FILTERS,
    filters
  };
};

const receivedFullFilter = (fullFilter: IFullFilter): AnyAction => {
  return {
    type: RECEIVED_FULL_FILTER,
    fullFilter
  };
};

const receivedFullItems = (fullItems: IEbayItemFull): AnyAction => {
  return {
    type: RECEIVED_FULL_ITEMS,
    fullItems
  };
};

const receivedBaseFilterHistory = (items: IEbayItem[]): AnyAction => {
  return {
    type: RECEIVED_BASE_FILTER_HISTORY,
    items
  };
};

export function getBaseFilterHistorySummary(categoryId: number, filterString: string, conditions: number[], priceMin?: number, priceMax?: number, minFeedbackScore?: number): ThunkResult<void> {
  return async (dispatch) => {
    dispatch({
      type: FETCH_BASE_FILTER_HISTORY
    });

    const items = await getFilterHistorySummary(categoryId, filterString, conditions, priceMin, priceMax, minFeedbackScore);

    dispatch(receivedBaseFilterHistory(items));
  }
}

export async function getFilterHistorySummary(categoryId: number, filterString: string, conditions: number[], priceMin?: number, priceMax?: number, minFeedbackScore?: number): Promise<IEbayItem[]> {
  const url = await getDataUrl();
  const res = await fetch(`${url}/ebay/history?categoryId=${categoryId}&filterString=${encodeURIComponent(filterString)}&conditions=${conditions.join(',')}${priceMin != null ? `&priceMin=${priceMin}` : ''}${priceMax != null ? `&priceMax=${priceMax}` : ''}${minFeedbackScore != null ? `&minFeedbackScore=${minFeedbackScore}` : ''}`);
  const json = await res.json();

  return json;
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
  return async (dispatch) => {
    dispatch({
      type: IS_FETCHING_CHILD_CATEGORIES
    });
    
    const url = await getDataUrl();
    const res = await fetch(`${url}/ebay/category/${categoryId}`);
    const json = await res.json();
    dispatch(receivedChildCategories(json, level));
  }
}

export function createFilter(filterName: string, categoryId: number, keywords: string, conditions: number[], priceMin: number | null, priceMax: number | null, userFeedbackMin: number | null): ThunkResult<void> {
  return (dispatch) => {
    dispatch({
      type: IS_CREATING_FILTER
    });
    const filterPostBody = {
      active: false,
      filterName,
      categoryId,
      keywords,
      conditions,
      priceMax,
      priceMin,
      userFeedbackMin
    };
    return getDataUrl()
      .then((url) => fetch(`${url}/filters`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filterPostBody) 
      }));
  }
}

export function fetchFilters(): ThunkResult<void> {
  return (dispatch) => {
    dispatch({
      type: IS_FETCHING_FILTERS
    });
    return getDataUrl()
      .then((url) => fetch(`${url}/filters`)
      .then((res) => res.json())
      .then((json) => dispatch(receivedFilters(json))));
  }
}

export function fetchFullFilter(filterId: number): ThunkResult<void> {
  return (dispatch) => {
    dispatch({
      type: IS_FETCHING_FULL_FILTER
    });
    return getDataUrl()
      .then((url) => fetch(`${url}/filters/${filterId}`)
      .then((res) => res.json())
      .then((json) => dispatch(receivedFullFilter(json))));
  }
}

export function loadDemoData(): ThunkResult<void> {
  return async (dispatch) => {
    dispatch({
      type: IS_FETCHING_FULL_FILTER
    });

    const demoItemsResponse = await fetch('http://localhost:3000/ItemSummary.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const demoItems = await demoItemsResponse.json();

    dispatch(receivedFilterHistorySummary(demoItems));
  }
}

export function getMultipleItems(itemIds: number[]): ThunkResult<void> {
  return async (dispatch) => {
    const url = await getDataUrl();
    const res = await fetch(`${url}/ebay/getMultipleItems/${itemIds.join(',')}`);
    const items = await res.json();

    dispatch(receivedFullItems(items));
  }
}