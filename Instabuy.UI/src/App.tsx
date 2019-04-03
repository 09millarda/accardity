import * as React from 'react';
import Header from './Layout/Header/Header';
import SideBar from './Layout/Sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Views/Main/Dashboard/Dashboard';
import FilterCreate from './Views/Filters/Create/Create';
import FilterManage from './Views/Filters/Manage/Manage';
import ResearchCreate from './Views/Research/Create/Create';

class App extends React.Component {
  public render() {
    return (
      <div id="wrapper">
        <Header />
        <SideBar />
        <div className="content-page">
          <div className="content">
            <Switch>
              <Route exact={true} path="/" component={Dashboard} />
              <Route path="/filters/create/" component={FilterCreate} />
              <Route path="/filters/" component={FilterManage} />
              <Route path="/research/create/" component={ResearchCreate} />
            </Switch>  
          </div>          
        </div>
      </div>
    );
  }
}

export default App;