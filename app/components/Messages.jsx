import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Message from 'Message';
import * as actions from 'actions';

let $ = require('jquery');

export class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom() {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    receiveMessage (friendId) {
		const {socket, dispatch} = this.props;
		let user = JSON.parse(localStorage.getItem('auth_user'))._id;

        socket.on(user+'-'+friendId, function (msg) {
            dispatch(actions.keepMessage(msg));
        });

        socket.on(user + '-friendsUpdate', (data) => {
            data.accepted = true;
            data.friend = true;
            data.chat_room = user+'-'+data._id;
            dispatch(actions.updateFriendsListReceived(data));
            this.forceUpdate();
        });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        let {userInfo} = this.props;

        if(typeof this.props.friendId !== 'undefined') {
            this.receiveMessage(this.props.friendId);
        }
        this.scrollToBottom();
    }

    render() {
        let {messages, userInfo} = this.props;

        let renderMessages = () => {
            return messages.map(function(message, index) {
                return (
                    <Message message={message} key={index} userInfo={userInfo} />
                );
            });
        }
        return (
            <div ref={(el) => {this.messagesContainer = el;}}
                 className="col-xs-5 col-sm-5 col-md-5 col-lg-5 custom-div messages pre-scrollable border-line">
                 {renderMessages()}
            </div>
        );
    }
}

export default connect()(Messages);
