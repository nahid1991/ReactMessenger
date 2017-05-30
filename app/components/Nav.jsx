import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class Nav extends React.Component{
  logout(){
    localStorage.removeItem('auth_user');
    localStorage.removeItem('loginData');
    window.location.hash = '#/';
  }

  render () {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">

            <div className="navbar-header">

              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">hubtalk</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav navbar-right">
                <li>
                    <a href="#" onClick={this.logout.bind(this)}>Log out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
