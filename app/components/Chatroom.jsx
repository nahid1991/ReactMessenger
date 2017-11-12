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
        const {dispatch} = this.props;
        if(typeof newProps.params.id ==='undefined') {
            dispatch(actions.storeFriendId(''));
        } else {
            dispatch(actions.storeFriendId(newProps.params.id));
        }

        localStorage.setItem('friendId', newProps.params.id);
        friendId = newProps.params.id;
        if(this.props.params.id !== newProps.params.id) {
            socket.removeAllListeners();
        }
        this.forceUpdate();
    }

    componentWillUnmount(){
        socket.disconnect();
    }

    render() {
        let friends = JSON.parse(localStorage.getItem('friends'));
        let friendId = localStorage.getItem('friendId');
        let friendInfo = null;
        if(friendId !== 'undefined') {
            friendInfo = friends.filter(function(friend) {
                return friend._id === friendId;
            });
        }
        return (
            <div>
                <Nav socket={socket} userInfo={JSON.parse(localStorage.getItem('auth_user'))}/>
                <div className="panel">
                    <div className="panel-body">
                        <div className="row">
                            <Friends socket={socket} friendsInfo={this.props.friendsInfo}/>
                            <Messages socket={socket} friendId={this.props.friendId}/>
                            <ProfileDetail socket={socket} friendInfo={friendInfo}/>
                        </div>
                    </div>
                </div>
                <Chatbox socket={socket} friendId={this.props.friendId}/>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        friendsInfo: store.friendsInfo,
        userInfo: store.userInfo,
        friendId: store.friendId
    }
}

export default connect(mapStateToProps)(Chatroom);
