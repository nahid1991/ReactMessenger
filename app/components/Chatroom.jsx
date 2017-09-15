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

var socket;

export class Chatroom extends React.Component {
    componentWillMount() {
        socket = io.connect('http://localhost:4201');
        socket.on('connect', function(){
            // console.log(socket.io.engine.id);
        });
        var {dispatch} = this.props;
        dispatch(actions.getUserData(JSON.parse(localStorage.getItem('auth_user'))));
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
