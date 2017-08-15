import React from 'react';
import Nav from 'Nav';
import Friends from 'Friends';
import Messages from 'Messages';
import ProfileDetail from 'ProfileDetail';
import Chatbox from 'Chatbox';
import {connect} from 'react-redux';
import * as actions from 'actions';

var store = require('configureStore').configure();
import io from 'socket.io-client';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

var socket;

export class Chatroom extends React.Component {
    componentWillMount() {
        socket = io.connect('http://localhost:4200');
        var {dispatch} = this.props;
        dispatch(actions.get_user_data(JSON.parse(localStorage.getItem('auth_user'))));
        dispatch(actions.store_friends_data(JSON.parse(localStorage.getItem('friends'))));
    }

    componentWillUnmount(){
        socket.disconnect();
    }

    render() {
        return (
            <div>
                <Nav socket={socket}/>
                <div className="panel">
                    <div className="panel-body">
                        <div className="row">
                            <Friends socket={socket} friendsInfo={this.props.friendsInfo}/>
                            <Messages socket={socket}/>
                            <ProfileDetail socket={socket} userInfo={this.props.userInfo}/>
                        </div>
                    </div>
                </div>
                <Chatbox socket={socket}/>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        friendsInfo: store.friendsInfo,
        userInfo: store.userInfo
    }
}

export default connect(mapStateToProps)(Chatroom);
