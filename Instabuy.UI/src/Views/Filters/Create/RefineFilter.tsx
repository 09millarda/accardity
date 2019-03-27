import React, { PureComponent } from "react";
import { FilterCreateContext } from "src/App/contexts/FilterCreateContext";
import history from "../../../App/history";
import FilterBuilderStepButtons from "./FilterBuilderStepButtons";
import Form from "./Form";
import NextStep from "./NextStep";
import WithLoading from "src/Components/LoadingHOC/WithLoading";
import SdMultiplierSelector from "./SdMultiplierSelector";
import ListingTimeAndPriceGraph from "../Report/ListingTimeAndPriceGraph";
import SalesPerDay from "../Report/SalesPerDay";

class RefineFilter extends PureComponent {
  public render() {
    return (
      <FilterCreateContext.Consumer>
        {({ dispatch, refinedFilterHistory }) => {
          if (refinedFilterHistory.length <= 1) {
            history.push("/filters/create/");
          }

          const filter = refinedFilterHistory[refinedFilterHistory.length - 1];
          return (
            <div className="row">
              <div className="col-md-6">
                <FilterBuilderStepButtons
                  step={refinedFilterHistory.length}
                  dispatch={dispatch}
                />
                <div className="row">
                  <div className="col-12">
                    <Form
                      dispatch={dispatch}
                      formChanged={filter.formChanged}
                      formInfo={filter.formData}
                      isFetching={filter.isFetchingItems}
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
                      <h4>Summary</h4>
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
                        <ListingTimeAndPriceGraph
                          sdItems={filter.statisticalData.items}
                        />
                      </div>
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

export default RefineFilter;
