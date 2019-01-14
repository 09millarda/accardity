import * as React from 'react';
import Header from './Layout/Header/Header';
import SideBar from './Layout/Sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Views/Main/Dashboard/Dashboard';
import Create from './Views/Filters/Create/Create';
import Manage from './Views/Filters/Manage/Manage';

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
              <Route path="/filters/create/" component={Create} />
              <Route path="/filters/" component={Manage} />
            </Switch>  
          </div>          
        </div>
      </div>
    );
  }
}

export default App;