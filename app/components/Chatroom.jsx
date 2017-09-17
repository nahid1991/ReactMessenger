import React from 'react';
import Nav from 'Nav';
import Friends from 'Friends';
import Messages from 'Messages';
import ProfileDetail from 'ProfileDetail';
import Chatbox from 'Chatbox';
import {connect} from 'react-redux';
import * as actions from 'actions';

let store = require('configureStore').configure();
import io from 'socket.io-client';
let friendId;

let socket;

export class Chatroom extends React.Component {
    componentWillMount() {
        socket = io.connect('http://localhost:4201');
        let {dispatch, params} = this.props;
        friendId = params.id;
        localStorage.setItem('friendId', friendId);

        dispatch(actions.getUserData(JSON.parse(localStorage.getItem('auth_user'))));
    }

    componentWillReceiveProps(newProps) {
        localStorage.setItem('friendId', newProps.params.id);
        friendId = newProps.params.id;
        this.forceUpdate();
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
                            <Messages socket={socket} friendId={friendId}/>
                            <ProfileDetail socket={socket} userInfo={this.props.userInfo}/>
                        </div>
                    </div>
                </div>
                <Chatbox socket={socket} friendId={friendId}/>
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
