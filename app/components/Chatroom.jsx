import React from 'react';
import Nav from 'Nav';
import Friends from 'Friends';
import Messages from 'Messages';
import ProfileDetail from 'ProfileDetail';
import Chatbox from 'Chatbox';
import {connect} from 'react-redux';
import * as actions from 'actions';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class Chatroom extends React.Component{
  componentWillMount(){
    var {dispatch} = this.props;
    if(!JSON.parse(localStorage.getItem('loginData'))){
      window.location.hash = '#/';
    } else {
      dispatch(actions.get_user_data());
      setTimeout(function(){
        if(!JSON.parse(localStorage.getItem('auth_user'))){
          window.location.hash = "#/";
        } else {
          dispatch(actions.keep_user_data(JSON.parse(localStorage.getItem('auth_user'))));
        }
      }, 500);
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

export default connect()(Chatroom);
