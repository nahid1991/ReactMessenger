import React from 'react';
import ReactDOM from 'react-dom';

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

    componentDidMount() {
        const {socket} = this.props;
        let event = localStorage.getItem('friendId');
        let user = JSON.parse(localStorage.getItem('auth_user'))._id;
        socket.on(user+'-'+event, function (msg) {
            console.log(msg);
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
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }


    render() {
        return (
            <div ref={(el) => {this.messagesContainer = el;}}
                 className="col-xs-6 col-sm-6 col-md-6 col-lg-6 custom-div messages pre-scrollable border-line">
            </div>
        );
    }
}

export default Messages;
