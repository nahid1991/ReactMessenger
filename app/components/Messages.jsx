import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';
import ReactDOM from 'react-dom';

var $ = require('jquery');

export class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom() {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    componentDidMount() {
        const {socket} = this.props;
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        socket.on('something else', function (msg) {
            var message = msg.message;
            console.log(message);
            if (msg.id == (JSON.parse(localStorage.auth_user)._id)) {
                console.log(JSON.stringify(msg));
                $('.messages').append(
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                    '<p class="my-message">' + message +
                    '</p></div>'
                );
                this.scrollToBottom();
            } else {
                console.log(JSON.stringify(msg));
                $('.messages').append(
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                    '<p class="friends-message">' + message +
                    '</p></div>'
                );
                this.scrollToBottom();
            }
        });
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }


    render() {
        return (
            <div ref={(el) => {this.messagesContainer = el;}}
                 className="col-xs-8 col-sm-7 col-md-7 col-lg-7 custom-div messages pre-scrollable border-line">
            </div>
        );
    }
}

export default Messages;
