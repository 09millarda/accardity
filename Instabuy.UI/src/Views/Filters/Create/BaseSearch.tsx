import React, { Component } from "react";
import Form from "./Form";
import WithLoading from "src/Components/LoadingHOC/WithLoading";
import SdMultiplierSelector from "./SdMultiplierSelector";
import { FilterCreateContext } from "src/App/contexts/FilterCreateContext";
import ListingTimeAndPriceGraph from "../Report/ListingTimeAndPriceGraph";
import PriceInfo from "../Report/PriceInfo";
import TrendInfo from "../Report/RegressionInfo";
import SalesPerDay from "../Report/SalesPerDay";
import SalesPerDayGraph from "../Report/SalesPerDayGraph";
import * as moment from "moment-timezone";
import { london } from "src/App/common/moment-formats";
import NextStep from "./NextStep";

class BaseSearch extends Component {
  public render() {
    return (
      <FilterCreateContext.Consumer>
        {({ refinedFilterHistory, dispatch }) => {
          const filter = refinedFilterHistory[refinedFilterHistory.length - 1];
          return (
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-12">
                    <Form
                      dispatch={dispatch}
                      formInfo={filter.formData}
                      isFetching={filter.isFetchingItems}
                      formChanged={filter.formChanged}
                    />
                  </div>
                </div>
                {filter.responseItems.length > 0 &&
                  !filter.isFetchingItems &&
                  !filter.formChanged && (
                    <div className="row">
                      <div className="col-12">
                        <NextStep
                          nextPage="/filters/create/refineFilter/"
                          text="Next Step (Refine Filter)"
                          dispatch={dispatch}
                          nextStep={"REFINE_FILTER"}
                        />
                      </div>
                    </div>
                  )}
              </div>
              {(filter.statisticalData.items.length !== 0 ||
                filter.isFetchingItems) && (
                <div className="col-md-6 card-box">
                  <div className="p-20">
                    <WithLoading loading={filter.isFetchingItems}>
                      <h4 className="m-t-0 header-title">Summary</h4>
                      <hr />
                      <div className="row">
                        <div className="col-md-6">
                          <SdMultiplierSelector
                            dispatch={dispatch}
                            filterInfo={filter}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <PriceInfo
                          meanPrice={filter.statisticalData.meanPrice}
                          priceMax={filter.statisticalData.priceMax}
                          priceMin={filter.statisticalData.priceMin}
                        />
                      </div>
                      <div className="row">
                        <ListingTimeAndPriceGraph
                          sdItems={filter.statisticalData.items}
                        />
                      </div>
                      <div className="row" style={{ marginTop: "25px" }}>
                        <TrendInfo
                          c={filter.statisticalData.regressionYIntercept}
                          m={filter.statisticalData.regressionGradient}
                        />
                      </div>
                      <div className="row" style={{ marginTop: "25px" }}>
                        {filter.statisticalData.items.length > 0 && (
                          <SalesPerDayGraph
                            firstDate={moment.tz(
                              filter.statisticalData.items[0].listingInfo
                                .endTime,
                              london
                            )}
                            itemsByDay={filter.statisticalData.itemsByDay}
                          />
                        )}
                      </div>
                      <br />
                      <div className="row" style={{ marginTop: "25px" }}>
                        <SalesPerDay
                          itemsByDay={filter.statisticalData.itemsByDay}
                        />
                      </div>
                    </WithLoading>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </FilterCreateContext.Consumer>
    );
  }
}

export default BaseSearch;
