import React from 'react';
import Nav from 'Nav';
import Friends from 'Friends';
import Messages from 'Messages';
import ProfileDetail from 'ProfileDetail';
import Chatbox from 'Chatbox';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class Chatroom extends React.Component{
  componentWillMount(){
    if(!JSON.parse(localStorage.getItem('loginData'))){
      window.location.hash = '#/';
    }
  }


  render () {
    return (
      <div>
        <Nav/>
        <div className="panel">
          <div className="panel-body">
            <div className="row">
              <Friends/>
              <Messages/>
              <ProfileDetail/>
            </div>
          </div>
        </div>
        <Chatbox/>
      </div>
    );
  }
}

export default Chatroom;
