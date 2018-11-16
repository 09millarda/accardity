import BreadcrumbBar from "src/Layout/BreadcrumbBar/BreadcrumbBar";
import * as React from 'react';
import Form from './Form';
import Report from './Report';
import { IEbayItem, IReduxState } from 'src/App/index';
import { connect } from 'react-redux';

interface ICreateStateProps {
  isFetchingFilterReport: boolean;
  filterItems: IEbayItem[];
}

type ICreateProps = ICreateStateProps;

class Create extends React.Component<ICreateProps> {
  public render() {
    return (
      <div className="container-fluid">
        <BreadcrumbBar
          title={'Create Filter'}
          breadcrumbItems={[
            {
              name: 'Home',
              to: '/'
            },
            {
              name: 'Filters',
              to: '/filters'
            },
            {
              name: 'Create',
              to: ''
            }
          ]}
        />
        <Form />
        {
          !this.props.isFetchingFilterReport && this.props.filterItems.length > 0 &&
          <Report />
        }
      </div>
    )
  }
}

const mapStateToProps = (state: IReduxState): ICreateStateProps => {
  return {
    filterItems: state.filterState.createFilterState.filterHistorySummary,
    isFetchingFilterReport: state.filterState.createFilterState.isFetchingFilterHistorySummary
  };
};

export default connect(mapStateToProps)(Create);