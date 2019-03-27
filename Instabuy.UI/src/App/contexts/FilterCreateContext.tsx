import React from 'react';
import { IFilterCreateContext, IEbayItem } from '../index';
import { AnyAction } from 'redux';
import * as moment from 'moment-timezone';
import { london, dateFormat } from '../common/moment-formats';
import 'src/App/common/mathExtensions';
import { groupBy } from '../common/helpers';

const initialState: IFilterCreateContext = {
  step: 'DESIGN_BASE_FILTER',
  refinedFilterHistory: [
    {
      formChanged: false,
      formData: {
        binOnly: false,
        categories: [],
        conditions: [],
        keywords: '',
        categoryDataLists: []
      },
      fullItemEbayItemIds: [],
      hotOrNotData: {
        hotItemIds: [],
        notHotItemIds: []
      },
      isFetchingItems: false,
      responseItems: [],
      statisticalData: {
        items: [],
        itemsByDay: new Map(),
        itemsPriceDesc: [],
        meanPrice: 0,
        priceMax: 0,
        priceMin: 0,
        regressionGradient: 0,
        regressionYIntercept: 0,
        sd: 0,
        sdMultiplier: 1.5
      }
    }
  ],
  fullItems: [],
  dispatch: () => ({})
};

export const FilterCreateContext = React.createContext<IFilterCreateContext>(initialState);

const calculateStatistics = (items: IEbayItem[], sdMultiplier: number) : [IEbayItem[], IEbayItem[], Map<string, IEbayItem[]>, number, number, number, number, number, number] => {
  const meanPrice = items.reduce((t, item) => t + item.sellingStatus.convertedCurrentPrice.value, 0) / items.length;
  const variance = items.reduce((t, item) => t + Math.pow((item.sellingStatus.convertedCurrentPrice.value - meanPrice), 2), 0) / items.length;
  const sd = parseFloat(Math.sqrt(variance).toFixed(2));
  const sdItems = items.filter((i) => i.sellingStatus.convertedCurrentPrice.value <= meanPrice + (sd * sdMultiplier) && i.sellingStatus.convertedCurrentPrice.value >= meanPrice - (sd * sdMultiplier));

  let regressionGradient = 0;
  let regressionYIntercept = 0;
  let minPrice = 0;
  let maxPrice = 0;
  let sdItemsPriceDesc: IEbayItem[] = [];
  if (sdItems.length > 0) {
    const firstItem = sdItems[0];
    const firstDate = moment.tz(firstItem.listingInfo.endTime, london);
    const coordData = sdItems.map((i): I2DCoord => ({
      x: moment.tz(i.listingInfo.endTime, london).diff(firstDate, 'second'),
      y: i.sellingStatus.convertedCurrentPrice.value
    }));
    const mc = Math.LinearRegression(coordData);

    regressionGradient = mc.m;
    regressionYIntercept = mc.c;

    sdItemsPriceDesc = sdItems.slice().sort((a, b) => b.sellingStatus.convertedCurrentPrice.value + (b.shippingInfo.shippingServiceCost ? b.shippingInfo.shippingServiceCost.value : 0) - a.sellingStatus.convertedCurrentPrice.value + (a.shippingInfo.shippingServiceCost ? a.shippingInfo.shippingServiceCost.value : 0));

    minPrice = sdItemsPriceDesc[0].sellingStatus.convertedCurrentPrice.value;
    maxPrice = sdItemsPriceDesc[sdItemsPriceDesc.length - 1].sellingStatus.convertedCurrentPrice.value;
  }

  const itemsByDay = groupBy<IEbayItem, string>(sdItems, (item: IEbayItem) => moment.tz(item.listingInfo.endTime, london).format(dateFormat));

  return [sdItems, sdItemsPriceDesc, itemsByDay, meanPrice, sd, regressionGradient, regressionYIntercept, minPrice, maxPrice];
}

const reducer = (state: IFilterCreateContext, action: AnyAction): IFilterCreateContext => {
  const refinedFilterHistory = state.refinedFilterHistory.slice();
  const currentFilter = refinedFilterHistory[refinedFilterHistory.length - 1];
  if (action.type === 'FetchResponseItems') {
    currentFilter.isFetchingItems = true;
    return {...state, refinedFilterHistory};
  } else if (action.type === 'SetResponseItems') {
    const [sdItems, itemsPriceDesc, itemsByDay, meanPrice, sd, regressionGradient, regressionYIntercept, priceMin, priceMax] = calculateStatistics(action.items, currentFilter.statisticalData.sdMultiplier);
      currentFilter.responseItems = action.items;
      currentFilter.isFetchingItems = false;
      currentFilter.statisticalData = {
        items: sdItems,
        meanPrice,
        sd,
        regressionGradient,
        regressionYIntercept,
        priceMin,
        priceMax,
        itemsByDay,
        itemsPriceDesc,
        sdMultiplier: currentFilter.statisticalData.sdMultiplier
      };
      return {...state, refinedFilterHistory};
  } else if (action.type === 'SetSdMultiplier') {
    const [sdItems, itemsPriceDesc, itemsByDay, meanPrice, sd, regressionGradient, regressionYIntercept, priceMin, priceMax] = calculateStatistics(currentFilter.responseItems, action.sdMultiplier);
    currentFilter.statisticalData = {
      items: sdItems,
      meanPrice,
      sd,
      regressionGradient,
      regressionYIntercept,
      priceMin,
      priceMax,
      itemsByDay,
      itemsPriceDesc,
      sdMultiplier: action.sdMultiplier
    };
    return {...state, refinedFilterHistory};
  } else if (action.type === 'ResetForm') {
    currentFilter.responseItems = [];
    return {...state, refinedFilterHistory};
  } else if (action.type === 'SubmitForm') {
    currentFilter.formChanged = false;
    currentFilter.formData = {
      binOnly: action.binOnly,
      conditions: action.conditions,
      categories: action.categories,
      keywords: action.keywords,
      minUserFeedback: action.minUserFeedback,
      priceMax: action.priceMax,
      priceMin: action.priceMin,
      categoryDataLists: currentFilter.formData.categoryDataLists
    };
    return {...state, refinedFilterHistory};
  } else if (action.type === 'FormChanged') {
    currentFilter.formChanged = true;
    return {...state, refinedFilterHistory};
  } else if (action.type === 'SetStep') {
    // First step to refine step
    if (state.step === 'DESIGN_BASE_FILTER' && action.step === 'REFINE_FILTER') {
      refinedFilterHistory.push(JSON.parse(JSON.stringify(currentFilter)));
      return {...state, refinedFilterHistory, step: action.step};
    }
    return {...state, step: action.step};
  } else if (action.type === 'ResetAll') {
    return {
      dispatch: state.dispatch,
      fullItems: [],
      step: 'DESIGN_BASE_FILTER',
      refinedFilterHistory: [
        {
          formChanged: false,
          formData: {
            binOnly: false,
            categories: [],
            conditions: [],
            keywords: '',
            categoryDataLists: []
          },
          fullItemEbayItemIds: [],
          hotOrNotData: {
            hotItemIds: [],
            notHotItemIds: []
          },
          isFetchingItems: false,
          responseItems: [],
          statisticalData: {
            items: [],
            itemsByDay: new Map(),
            itemsPriceDesc: [],
            meanPrice: 0,
            priceMax: 0,
            priceMin: 0,
            regressionGradient: 0,
            regressionYIntercept: 0,
            sd: 0,
            sdMultiplier: 1.5
          }
        }
      ]
    };
  } else if (action.type === 'SetDataList') {
    currentFilter.formData.categoryDataLists[action.level] = action.dataList;
  } else if (action.type === 'StepBack') {
    const filterHistory = state.refinedFilterHistory.slice();
    refinedFilterHistory.pop();

    return {...state, refinedFilterHistory: filterHistory};
  }
  return state;
}

class FilterCreateProvider extends React.Component<{}, IFilterCreateContext> {
  public constructor(props: {}) {
    super(props);

    this.state = { ...initialState, dispatch: (action) => this.setState((state) => reducer(state, action)) };
  }

  public render() {
    return (
      <FilterCreateContext.Provider value={this.state}>
        {this.props.children}
      </FilterCreateContext.Provider>
    );
  }
}

export default FilterCreateProvider;