import React from 'react';
import Nav from 'Nav';
import Friends from 'Friends';
import Messages from 'Messages';
import ProfileDetail from 'ProfileDetail';
import Chatbox from 'Chatbox';
import {connect} from 'react-redux';
import * as actions from 'actions';
var store = require('configureStore').configure();
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class Chatroom extends React.Component{

  componentWillMount(){
    var {dispatch} = this.props;
    // if(!JSON.parse(localStorage.getItem('loginData'))){
    //   window.location.hash = '#/';
    // } else {
    //   // dispatch(actions.get_user_data());
    //   setTimeout(function(){
    //     if(!JSON.parse(localStorage.getItem('auth_user'))){
    //       window.location.hash = "#/";
    //     } else {
    dispatch(actions.get_user_data(JSON.parse(localStorage.getItem('auth_user'))));
    dispatch(actions.store_friends_data(JSON.parse(localStorage.getItem('friends'))));
    // if(this.props.friendsInfo == null){
    // }
    //     }
    //   }, 500);
    // }
    // return { loaded:false };
  }


  render () {
    return (
      <div>
        <Nav/>
        <div className="panel">
          <div className="panel-body">
            <div className="row">
              <Friends friendsInfo={this.props.friendsInfo}/>
              <Messages/>
              <ProfileDetail userInfo={this.props.userInfo}/>
            </div>
          </div>
        </div>
        <Chatbox/>
      </div>
    );
  }
}

const mapStateToProps = function(store){
  return {
    friendsInfo: store.friendsInfo,
    userInfo: store.userInfo
  }
}

export default connect(mapStateToProps)(Chatroom);
