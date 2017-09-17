import React from 'react';

export class Chatbox extends React.Component {
    sendMessage(e) {
        const {socket} = this.props;
        let friendId = localStorage.getItem('friendId');
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

                socket.emit('message', formattedData);
                this.refs.message.value = '';
                this.refs.message.focus();
            }

        }
    }

    sendMessageButton(e) {
        const {socket} = this.props;
        let friendId = localStorage.getItem('friendId');
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

            socket.emit('message', formattedData);
            this.refs.message.value = '';
            this.refs.message.focus();
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

export default Chatbox;
