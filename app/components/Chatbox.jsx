import React from 'react';

// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class Chatbox extends React.Component {
    sendMessage(e) {
        const {socket} = this.props;
        if (e.key == 'Enter') {
            e.preventDefault();
            if(this.refs.message.value != ''){
                var formattedData = {
                    id: (JSON.parse(localStorage.auth_user))._id,
                    message: this.refs.message.value
                };

                socket.emit('something else', formattedData);
                this.refs.message.value = '';
                this.refs.message.focus();
            }

        }
    }

    sendMessageButton(e) {
        const {socket} = this.props;
        e.preventDefault();
        if(this.refs.message.value != ''){
            var formattedData = {
                id: (JSON.parse(localStorage.auth_user))._id,
                message: this.refs.message.value
            };

            socket.emit('something else', formattedData);
            this.refs.message.value = '';
            this.refs.message.focus();
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-bottom center bottom-nav">
                    <div className="container-fluid navbar-inner">
                        <div className="input-group">
                            <textarea className="form-control custom-control custom" rows="2" cols="8" ref="message"
                                onKeyPress={this.sendMessage.bind(this)}></textarea>
                            <span className="input-group-addon btn btn-default"
                                  onClick={this.sendMessageButton.bind(this)}><i className="fa fa-paper-plane"></i></span>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Chatbox;
