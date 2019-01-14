import React, { PureComponent } from 'react'
import { FilterCreateContext } from 'src/App/contexts/FilterCreateContext';
import Form from './Form';
import history from '../../../App/history';

class RefineFilter extends PureComponent {
  public render() {
    return (
      <FilterCreateContext.Consumer>
        {
          ({dispatch, refinedFilterHistory}) => {
            if (refinedFilterHistory.length <= 1) {
              history.push('/filters/create/');
            }

            const filter = refinedFilterHistory[refinedFilterHistory.length - 1];
            return (
              <div className="row">
                <div className="col-md-6">
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
                </div>
              </div>
            );
          }
        }
      </FilterCreateContext.Consumer>
    );
  }
}

export default RefineFilter;