import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class Chatbox extends React.Component{
  render () {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-bottom center bottom-nav">
          <div className="container-fluid navbar-inner">
            <div className="input-group">
              <textarea className="form-control custom-control custom" rows="3"></textarea>
              <span className="input-group-addon btn btn-info">Send</span>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Chatbox;
