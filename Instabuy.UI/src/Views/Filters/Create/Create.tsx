import BreadcrumbBar from 'src/Layout/BreadcrumbBar/BreadcrumbBar';
import * as React from 'react';
import { IEbayItem, IReduxState } from 'src/App/index';
import { connect } from 'react-redux';
import { loadDemoData } from 'src/App/redux/actions/filterActions';
import { Switch, Route, Redirect } from 'react-router';
import BaseSearch from './BaseSearch';
import FilterCreateProvider from 'src/App/contexts/FilterCreateContext';
import RefineFilter from './RefineFilter';
import history from '../../../App/history';

interface ICreateStateProps {
  isFetchingFilterReport: boolean;
  filterItems: IEbayItem[];
}

interface ICreateDispatchProps {
  fetchDemoData: () => void;
}

type CreateProps = ICreateStateProps & ICreateDispatchProps;

class Create extends React.Component<CreateProps> {
  public componentDidMount() {
    this.props.fetchDemoData();
  }

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
        <FilterCreateProvider>
          <div className="row">
            {this.getWizardSteps()}
          </div>
          <div className="row">
            <div className="col-12">
              <Switch>
                <Redirect exact={true} from="/filters/create/" to="/filters/create/designBaseFilter/" />
                <Route exact={true} path="/filters/create/designBaseFilter/" component={BaseSearch} />
                <Route exact={true} path="/filters/create/refineFilter/" component={RefineFilter} />
                <Route exact={true} path="/filters/create/generateReport/" component={BaseSearch} />
              </Switch>
            </div>
          </div>
        </ FilterCreateProvider>
      </div>
    )
  }

  private getWizardSteps = () => {
    const path = history.location.pathname.toUpperCase();

    return (
      <div className="col-12">
        <p className={`wizard-header ${path.includes('DESIGNBASEFILTER') ? 'active' : ''}`}><b>Create Base Search</b></p>
        <p className="wizard-break">{'|'}</p>
        <p className={`wizard-header ${path.includes('REFINEFILTER') ? 'active' : ''}`}><b>Refine Filter</b></p>
        <p className="wizard-break">{'|'}</p>
        <p className={`wizard-header ${path.includes('REPORT') ? 'active' : ''}`}><b>Report</b></p>
      </div>
    );
  }
}

const mapStateToProps = (state: IReduxState): ICreateStateProps => {
  return {
    filterItems: state.filterState.createFilterState.filterHistorySummary,
    isFetchingFilterReport: state.filterState.createFilterState.isFetchingFilterHistorySummary
  };
};

const mapDispatchToProps = (dispatch: any): ICreateDispatchProps => {
  return {
    fetchDemoData: () => dispatch(loadDemoData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);