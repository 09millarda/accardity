import * as React from 'react';
import { IReduxState, IFullFilter } from 'src/App/index';
import {  } from 'src/App';
import { fetchFullFilter } from 'src/App/redux/actions/filterActions';
import { connect } from 'react-redux';
import WithLoading from 'src/Components/LoadingHOC/WithLoading';
import { dateTimeFormat, london } from 'src/App/common/moment-formats';
import Enabled from 'src/Components/StatusTags/Enabled';
import Disabled from 'src/Components/StatusTags/Disabled';
import * as moment from 'moment-timezone';
import SalesGraph from './SalesGraph';
import { getDataUrl } from 'src/App/common/endpointControl';
import swal from 'sweetalert';
import { withRouter, RouteComponentProps } from 'react-router';

interface IFullViewStateProps {
  isFetchingFullFilter: boolean;
  fullFilter?: IFullFilter;
}

interface IFullViewDispatchProps {
  fetchFullFilter: (filterId: number) => void;
}

interface IHistoryProps {
  filterId: string;
}

type IFullViewProps = RouteComponentProps<IHistoryProps> & IFullViewDispatchProps & IFullViewStateProps;

interface IFullViewState {
  filterId: number;
}

class FullView extends React.Component<IFullViewProps, IFullViewState> {
  public constructor(props: IFullViewProps) {
    super(props);

    this.state = {
      filterId: parseInt(this.props.match.params.filterId, 10)
    };
  }

  public componentDidMount() {
    if (this.state.filterId) {
      this.props.fetchFullFilter(this.state.filterId);
    }
  }

  public componentWillReceiveProps(nextProps: IFullViewProps) {
    if (this.props.match.params.filterId !== nextProps.match.params.filterId) {
      this.props.fetchFullFilter(parseInt(nextProps.match.params.filterId, 10));
    }
  }
  
  public render() {
    return (
      <div className="card-box">
        <div className="row">
          <div className="col-12">
            <button className="btn btn-danger pull-right" onClick={this.deleteFilter}>Delete</button>
            <h4 className="m-t-0 header-title">Filter Breakdown</h4>
            <p className="text-muted m-b-30 font-14">A full breakdown of the selected filter</p>
            <hr/>
            <WithLoading loading={this.props.isFetchingFullFilter}>
              <div>
                {
                  this.props.fullFilter &&
                  <div className="row">
                    <div className="col-12">
                      <p className="text-muted font-13">
                        <strong>Name</strong>
                        <span className="m-l-15">{this.props.fullFilter.filter.name}</span>
                        <span className="m-l-15">{this.props.fullFilter.filter.active ? <Enabled /> : <Disabled />}</span>
                      </p>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <p className="text-muted font-13">
                        <strong>Created</strong>
                        <span className="m-l-15">{moment.tz(this.props.fullFilter.filter.created, london).format(dateTimeFormat)}</span>
                      </p>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <p className="text-muted font-13">
                        <strong>Category</strong>
                        <span className="m-l-15">{this.props.fullFilter.filter.categoryId}</span>
                      </p>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <p className="text-muted font-13">
                        <strong>Condition(s)</strong>
                        <span className="m-l-15">{this.props.fullFilter.filter.conditions.join(', ')}</span>
                      </p>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <p className="text-muted font-13">
                        <strong>Updated</strong>
                        <span className="m-l-15">{moment.tz(this.props.fullFilter.filter.lastUpdated, london).format(dateTimeFormat)}</span>
                      </p>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <p className="text-muted font-13">
                        <strong>Execution Count</strong>
                        <span className="m-l-15">{this.props.fullFilter.filter.executionCount}</span>
                      </p>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <p className="text-muted font-13">
                        <strong>Last Executed</strong>
                        <span className="m-l-15">{moment.tz(this.props.fullFilter.filter.lastExecuted, london).format(dateTimeFormat)}</span>
                      </p>
                    </div>
                    <div className="col-12">
                      <p className="text-muted font-13">
                        <strong>Keywords</strong>
                        <textarea className="form-control m-t-5" disabled={true} value={this.props.fullFilter.filter.keywords} />
                      </p>
                    </div>
                    <div style={{width: '100%', height: '10px'}} />
                    <SalesGraph
                      historicalItems={this.props.fullFilter.historicalItems}
                    />
                  </div>
                }
              </div>
            </WithLoading>
          </div>
        </div>
      </div>
    );
  }

  private deleteFilter = async () => {
    if (this.state.filterId != null) {
      const confirm = await swal({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'You cannot undo this action',
        buttons: ['Cancel', 'Delete'],
        dangerMode: true
      });

      if (confirm) {
        const url = await getDataUrl();
        const response = await fetch(`${url}/filters/${this.state.filterId}`, {
          method: 'DELETE'
        });

        const body = await response.text();
        
        if (response.status === 200) {
          swal({
            icon: 'success',
            title: 'Filter deleted'
          });
        } else {
          swal({
            icon: 'error',
            title: 'Failed to delete file',
            text: `${body}`
          });
          console.error(`[${response.status}]: ${body}`);
        }
      } 
    } else {
      console.error('You cannot delete this filter at this time');
      swal({
        title: 'Failed to delete filter',
        icon: 'error'
      });
    }
  }
}

const mapStateToProps = (state: IReduxState): IFullViewStateProps => {
  return {
    fullFilter: state.filterState.manageFilterState.fullFilter,
    isFetchingFullFilter: state.filterState.manageFilterState.isFetchingFullFilter
  };
};

const mapDispatchToProps = (dispatch: any): IFullViewDispatchProps => {
  return {
    fetchFullFilter: (filterId: number) => dispatch(fetchFullFilter(filterId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FullView));