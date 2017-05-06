import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class Nav extends React.Component{
  render () {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">

            <div className="navbar-header">
            </div>
            <div>
              <ul className="nav navbar-nav navbar-left">
              </ul>
              <ul className="nav navbar-nav center">
                <li>
                  <a className="navbar-brand visible-md visible-lg" href="#">hubtalk</a>
                  <a className="navbar-brand visible-xs visible-sm" href="#">hubtalk</a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">

              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
