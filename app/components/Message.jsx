import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

export class Message extends React.Component {
    render() {
        let {message, userInfo} = this.props;
        let theMessage = message.message;

        let organizeMessage = () => {
            if(message.id == userInfo._id) {
                return (
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <p className="my-message">{message.message}</p>
                    </div>
                );
            } else {
                return (
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <p className="friends-message">{message.message}</p>
                    </div>
                );
            }
        }

        return (
            <div>
                {organizeMessage()}
            </div>
        );
    }
}

export default connect()(Message);