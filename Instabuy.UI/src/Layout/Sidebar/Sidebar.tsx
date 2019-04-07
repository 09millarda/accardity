import * as React from 'react';
import { NavLink } from 'react-router-dom';

class SideBar extends React.Component {
  public render() {
    return (
      <div className="left side-menu">
        <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '868px'}}>
          <div className="sidebar-inner slimscrollleft" style={{overflow: 'hidden', width: 'auto', height: '868px'}}>
            <div id="sidebar-menu">
              <ul>
                <li className="menu-title">Main</li>
                <li className="active">
                  <NavLink exact={true} to="/">
                    <i className="ti-home" />
                    Recent Listings
                  </NavLink>
                </li>
                <li className="menu-title">Filters</li>
                <li>
                  <NavLink exact={true} to="/filters">
                    <i className="fa fa-sliders" />
                    Manage
                  </NavLink>
                </li>
                <li>
                  <NavLink exact={true} to="/filters/create">
                    <i className="fa fa-plus-square-o" />
                    Create
                  </NavLink>
                </li>
                <li className="menu-title">Research</li>
                <li>
                  <NavLink exact={true} to="/research/create">
                    <i className="fa fa-plus-square-o" />
                    Create Filter
                  </NavLink>
                </li>
                <li className="menu-title">Bot</li>
                <li>
                  <NavLink exact={true} to="/bot/dashboard">
                    <i className="mdi mdi-robot" />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink exact={true} to="/bot/settings">
                    <i className="fa fa-cog" />
                    Configuration
                  </NavLink>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
            <div className="clearfix" />
          </div>
          <div className="slimScrollBar" style={{background: 'rgb(152, 166, 173)', width: '7px', position: 'absolute', top: '0px', opacity: 0.4, display: 'none', borderRadius: '7px', zIndex: 99, right: '1px', height: '868px', visibility: 'visible'}} />
          <div className="slimScrollRail" style={{width: '7px', height: '100%', position: 'absolute', top: '0px', display: 'none', borderRadius: '7px', background: 'rgb(51, 51, 51)', opacity: 0.2, zIndex: 90, right: '1px'}} />
        </div>
      </div>
    );
  }
}

export default SideBar;