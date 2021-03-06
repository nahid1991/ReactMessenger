import React from 'react';
let $ = require('jquery');
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Chatbox extends React.Component {
    sendMessage(e) {
        const {socket, friendId, dispatch} = this.props;
        if (e.key == 'Enter') {
            e.preventDefault();
            let message = this.refs.message.value;
            let result = message.match(/^ +$/g);

            if(message != '' && result == null){
                let formattedData = {
                    id: (JSON.parse(localStorage.auth_user))._id,
                    message: message,
                    chat_room_user: (JSON.parse(localStorage.auth_user))._id + '-' + friendId,
                    chat_room_friend: friendId + '-' + (JSON.parse(localStorage.auth_user))._id,
                };
                
                dispatch(actions.keepMessage(formattedData));
                socket.emit('message', formattedData);
                this.refs.message.value = '';
                this.refs.message.focus();
                dispatch(actions.updateFriendsList(friendId));
            }

        }
    }

    sendMessageButton(e) {
        const {socket, friendId, dispatch} = this.props;
        e.preventDefault();
        let message = this.refs.message.value;
        let result = message.match(/^ +$/g);

        if(message != '' && result == null){
            let formattedData = {
                id: (JSON.parse(localStorage.auth_user))._id,
                message: message,
                chat_room_user: (JSON.parse(localStorage.auth_user))._id + '-' + friendId,
                chat_room_friend: friendId + '-' + (JSON.parse(localStorage.auth_user))._id,
            };

            dispatch(actions.keepMessage(formattedData));
            socket.emit('message', formattedData);
            this.refs.message.value = '';
            this.refs.message.focus();
            dispatch(actions.updateFriendsList(friendId));
        } else {
            this.refs.message.focus();
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-bottom center bottom-nav">
                    <div className="container-fluid navbar-chat navbar-inner">
                        <div className="input-group">
                            <textarea className="form-control custom-control custom" rows="2" cols="8" ref="message"
                                      onKeyPress={this.sendMessage.bind(this)}></textarea>
                            <span className="input-group-addon"
                                  onClick={this.sendMessageButton.bind(this)}><i className="fa fa-paper-plane"></i></span>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


export default connect()(Chatbox);
