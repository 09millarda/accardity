import * as React from 'react';
import Row from './Row';
import { IFilter, IReduxState } from 'src/App/index';
import * as moment from 'moment-timezone';
import { london } from 'src/App/common/moment-formats';
import WithLoading from 'src/Components/LoadingHOC/WithLoading';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface ITableStateProps {
  isFetchingFilters: boolean;
  filters: IFilter[];
}

interface ITableInheritedProps {
  click: (filterId: number) => void;
}

type ITableProps = ITableStateProps & ITableInheritedProps;

class Table extends React.Component<ITableProps> {
  public render() {
    return (
      <div className="card-box">
        <Link to="/filters/create" className="btn btn-primary pull-right">+ Create Filter </Link>
        <h4 className="m-t-0 header-title">Your Filters</h4>
        <p className="text-muted m-b-30 font-13">Manage your eBay filters</p>
        <WithLoading loading={this.props.isFetchingFilters}>
          <table className="table table-striped-table-bordered toggle-circle m-b-0 default footable-loaded footable table-hover">
            <thead>
              <tr>
                <th className="footable-visible footable-first-column footable-sortable">
                  Name
                  <span className="footable-sort-indicator" />
                </th>
                <th className="footable-visible footable-sortable">
                  Category
                  <span className="footable-sort-indicator" />
                </th>
                <th className="footable-visible footable-sortable">
                  Execution Count
                  <span className="footable-sort-indicator" />
                </th>
                <th className="footable-visible footable-sortable">
                  Created
                  <span className="footable-sort-indicator" />
                </th>
                <th className="footable-visible footable-last-column footable-sortable">
                  Status
                  <span className="footable-sort-indicator" />
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.filters.map((f, i) => (
                  <Row
                    active={f.active}
                    category={f.categoryId}
                    created={moment.tz(f.created, london)}
                    executionCount={f.executionCount}
                    index={i}
                    name={f.name}
                    key={f.filterId}
                    click={this.props.click}
                    filterId={f.filterId}
                  />
                ))
              }
            </tbody>
          </table>
        </WithLoading>
      </div>
    );
  }
}

const mapStateToProps = (state: IReduxState): ITableStateProps => {
  return {
    filters: state.filterState.manageFilterState.filters,
    isFetchingFilters: state.filterState.manageFilterState.isFetchingFilters
  };
};

export default connect<ITableStateProps, {}, ITableInheritedProps>(mapStateToProps)(Table);