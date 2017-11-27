import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import { userInfo } from 'os';

let $ = require('jquery');

export class FriendCard extends React.Component {
    acceptRequest = (id) => {
        let {dispatch, socket, userInfo} = this.props;
        let user = userInfo[0]._id;
        let friendInformation = userInfo[0];
        friendInformation.friend = true;
        friendInformation.accepted = true;
        friendInformation.chat_room = id+'-'+user;
        let formattedData = {
            sender: user,
            receiver: id,
            user_info: friendInformation
        };

        socket.emit('acceptFriend', formattedData, function(success){
            console.log(success.success);
        });

        dispatch(actions.acceptFriend(id));
    }

    rejectRequest = (id) => {
        let {dispatch, socket, userInfo} = this.props;
        let user = userInfo[0]._id;
        let friendInformation = userInfo[0];
        friendInformation.friend = true;
        friendInformation.accepted = true;
        friendInformation.chat_room = id+'-'+user;
        let formattedData = {
            sender: user,
            receiver: id,
            user_info: friendInformation
        };

        socket.emit('removeFriend', formattedData, function(success){
            console.log(success.success);
        });

        dispatch(actions.rejectFriend(id));
    }

    sendRequest = (id) => {
        let {dispatch, userInfo, socket} = this.props;
        let user = userInfo[0]._id;
        let formattedData = {
            sender: user,
            receiver: id
        };

        socket.emit('addFriend', formattedData, function(success){
            console.log(success.success);
        });
        dispatch(actions.sendFriendReq(id, user));
    }
    
    cancelRequest = (id) => {
        let {dispatch, userInfo, socket} = this.props;
        let user = userInfo[0]._id;
        let formattedData = {
            sender: user,
            receiver: id
        };

        socket.emit('removeFriend', formattedData, function(success){
            console.log(success.success);
        });
        dispatch(actions.removeFriendReq(id, user));
    }

	render() {
		let {_id, name, picture, friend, accepted, userInfo, initiator} = this.props;

		let friendsButton = () => {
			if (friend === false && accepted === false) {
				return (
                    <span ref="btn" onClick={() => this.sendRequest(_id)} className="req btn btn-sm">
                        <i className="fa fa-plus"/></span>
				);
			}

			if (friend === true && accepted === false) {
                if(initiator == userInfo[0]._id) {
                    return (
                        <span ref="btn" onClick={() => this.cancelRequest(_id)} className="req btn btn-sm">
                        <i className="fa fa-check"/></span>
                    );
                }

                if(initiator !== userInfo[0]._id) {
                    return (
                        <span>
                            <span ref="btn" onClick={() => this.acceptRequest(_id)} className="req-accept btn btn-sm">
                            <i className="fa fa-check" /></span>
                            <span ref="btn" onClick={() => this.rejectRequest(_id)} className="req-reject btn btn-sm">
                            <i className="fa fa-times" /></span>
                        </span>
                    );
                }
			}
		};

		let friendInfo = () => {
            if(friend === false || (friend === true && accepted === false)) {
                return (
                    <a href={"#/tab/" + _id} title={name} onClick={e => e.preventDefault()}>
                        <img
                            className="thumb-friend img-thumbnail img-responsive visible-md visible-lg"
                            src={picture}/>
                        <img
                            className="thumb-friend-small img-thumbnail img-responsive visible-xs visible-sm"
                            src={picture}/>
                        <p className="custom-name-top">{name}</p>
                    </a>
                );
            } else {
                return (
                    <a href={"#/tab/" + _id} title={name}>
                        <img
                            className="thumb-friend img-thumbnail img-responsive visible-md visible-lg"
                            src={picture}/>
                        <img
                            className="thumb-friend-small img-thumbnail img-responsive visible-xs visible-sm"
                            src={picture}/>
                        <p className="custom-name-top">{name}</p>
                    </a>
                );
            }
        };

		return (
		<div>
			<div className="row">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 friend-card">
                    {friendInfo()}
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 req-btn">
                    {friendsButton()}
                </div>
                <hr/>
			</div>
		</div>
		);
	}
}

const mapStateToProps = function (store) {
	return {
		userInfo: store.userInfo
	};
};
export default connect(mapStateToProps)(FriendCard);
