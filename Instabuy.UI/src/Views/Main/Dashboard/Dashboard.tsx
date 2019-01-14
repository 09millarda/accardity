import * as React from 'react';
import BreadcrumbBar from 'src/Layout/BreadcrumbBar/BreadcrumbBar';
import FilterCreateProvider from 'src/App/contexts/FilterCreateContext';

class Dashboard extends React.Component {
  public render() {
    return (
      <FilterCreateProvider>
        <div className="container-fluid">
          <BreadcrumbBar
            title={'Dashboard'}
            breadcrumbItems={[
              {
                name: 'Home',
                to: '/'
              }
            ]}
          />
          <div className="row">
            <div className="col-7">
              <div className="card-box">
                <h4 className="m-t-0 header-title">Latest Listings</h4>
                <p className="text-muted m-b-30 font-13">Search through all the latest results found by your filters</p>
              </div>
            </div>
          </div>
        </div>
      </FilterCreateProvider>
    );
  }
}

export default Dashboard;