import * as React from 'react';
import Logo from '../../App/assets/images/logos/logo.png';

class Header extends React.Component {
  public render() {
    return (
      <div className="topbar">
        <div className="topbar-left">
          <div className="text-center">
            <a href="/" className="logo">
              <img src={Logo} alt="Instabuy Logo" width="30" />
              <span style={{position: 'relative', top: '3px', left: '4px'}}>Accardity</span>
            </a>
          </div>
        </div>
        <div className="navbar-custom">
          <ul className="list-inline float-right mb-0">
            <li className="list-inline-item dropdown notification-list">
              <a href="#" className="nav-link dropdown-toggle nav-user" role="button" aria-haspopup="false" aria-expanded="false">
                <img src="https://avatars1.githubusercontent.com/u/11366827?s=400&u=b2f1f22fed2a6cb9af8d8c28591d6b3203575779&v=4" alt="user" className="rounded-circle"/>
              </a>
              <div className="dropdown-menu dropdown-menu-right profile-dropdown" aria-labelledby="Preview" x-placement="bottom-end" style={{position: 'absolute', transform: 'translate3d(-110px, 70px, 0px)', top: '0px', left: '0px', willChange: 'transform'}}>
                <div className="dropdown-item noti-title">
                  <h5 className="text-overflow">
                    <small>Welcome, Aly!</small>
                  </h5>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;