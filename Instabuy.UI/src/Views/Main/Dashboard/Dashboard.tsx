import * as React from 'react';
import BreadcrumbBar from 'src/Layout/BreadcrumbBar/BreadcrumbBar';

class Dashboard extends React.Component {
  public render() {
    return (
      <div className="container-fluid">
        <BreadcrumbBar
          title={'Dashboard'}
          breadcrumbItems={[
            {
              name: 'Home',
              to: '/'
            },
            {
              name: 'Dashboard',
              to: ''
            }
          ]}
        />
      </div>
    );
  }
}

export default Dashboard;