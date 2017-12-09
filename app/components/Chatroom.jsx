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
        if(typeof newProps.params.id === 'undefined') {
            dispatch(actions.storeFriendId(''));
        } else {
            dispatch(actions.storeFriendId(newProps.params.id));
        }

        localStorage.setItem('friendId', newProps.params.id);
        friendId = newProps.params.id;
        socket.removeAllListeners();
        if(this.props.params.id !== newProps.params.id) {
            dispatch(actions.emptyMessages());
        }
        this.forceUpdate();
    }

    componentWillUnmount(){
        socket.disconnect();
    }

    render() {        
        return (
            <div>
                <Nav socket={socket} userInfo={JSON.parse(localStorage.getItem('auth_user'))}/>
                <div className="panel">
                    <div className="panel-body">
                        <div className="row">
                            <Friends socket={socket} friendsInfo={this.props.friendsInfo}/>
                            <Messages socket={socket} friendId={this.props.friendId} 
                            userInfo={JSON.parse(localStorage.getItem('auth_user'))} 
                            messages={this.props.messages}/>
                            <ProfileDetail socket={socket} friendsInfo={this.props.friendsInfo} 
                            friendId={this.props.friendId}/>
                        </div>
                    </div>
                </div>
                <Chatbox socket={socket} friendId={this.props.friendId} />
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        friendsInfo: store.friendsInfo,
        userInfo: store.userInfo,
        friendId: store.friendId,
        messages: store.messages
    }
};

export default connect(mapStateToProps)(Chatroom);
