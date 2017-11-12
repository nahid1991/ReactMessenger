import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

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
		const {socket} = this.props;
		let user = JSON.parse(localStorage.getItem('auth_user'))._id;

        socket.on(user+'-'+friendId, function (msg) {
            let message = msg.message;

            if (msg.id == (JSON.parse(localStorage.auth_user)._id)) {
                $('.messages').append(
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                    '<p class="my-message">' + message +
                    '</p></div>'
                );
                $('.messages').scrollTop($('.messages').height()*$('.messages').height());
            } else {
                $('.messages').append(
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                    '<p class="friends-message">' + message +
                    '</p></div>'
                );
                $('.messages').scrollTop($('.messages').height()*$('.messages').height());
            }
        });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentWillReceiveProps(newProps) {
        if(this.props.friendId !== newProps.friendId) {
            $('.messages').empty();
        }
    }

    componentDidUpdate() {
        if(typeof this.props.friendId !== 'undefined') {
            this.receiveMessage(this.props.friendId);
        }
        this.scrollToBottom();
    }

    render() {
        return (
            <div ref={(el) => {this.messagesContainer = el;}}
                 className="col-xs-5 col-sm-5 col-md-5 col-lg-5 custom-div messages pre-scrollable border-line">
            </div>
        );
    }
}

export default connect()(Messages);
