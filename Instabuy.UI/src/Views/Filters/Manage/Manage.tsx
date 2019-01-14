import * as React from 'react';
import BreadcrumbBar from "src/Layout/BreadcrumbBar/BreadcrumbBar";
import { IReduxState, IFilter } from 'src/App/index';
import { fetchFilters } from 'src/App/redux/actions/filterActions';
import { connect } from 'react-redux';
import Table from './Table';
import FullView from './FullView';
import { Route } from 'react-router-dom';

interface IManageStateProps {
  filters: IFilter[];
}

interface IManageDispatchProps {
  fetchFilters: () => void;
}

type IManageProps = IManageStateProps & IManageDispatchProps;

class Manage extends React.Component<IManageProps> {

  public componentDidMount() {
    this.props.fetchFilters();
  }

  public render() {
    return (
      <div className="container-fluid">
        <BreadcrumbBar
            title={'Manage Filters'}
            breadcrumbItems={[
              {
                name: 'Home',
                to: '/'
              },
              {
                name: 'Filters',
                to: '/filters'
              }
            ]}
          />
        <div className="row">
            <div className="col-md-6">
              <Table
                click={this.onClickRow}
              />
            </div>
            <div className="col-md-6">
              <Route
                exact={true}
                path={`/filters/view/:filterId`}
                component={FullView}
              />
            </div>
        </div>
      </div>
    );
  }

  private onClickRow = (filterId: number) => {
    this.setState({
      selectedFilterId: filterId
    });
  }
}

const mapStateToProps = (state: IReduxState): IManageStateProps => {
  return {
    filters: state.filterState.manageFilterState.filters
  };
};

const mapDispatchToProps = (dispatch: any): IManageDispatchProps => {
  return {
    fetchFilters: () => dispatch(fetchFilters())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);