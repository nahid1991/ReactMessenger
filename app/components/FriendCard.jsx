import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

let $ = require('jquery');

export class FriendCard extends React.Component {
	componentDidMount() {
        let {dispatch, socket} = this.props;
		$('.req').off().on('click', function (e) {
		    e.preventDefault();
			let el = $(this);
			let value = el.attr('value');
			let iClass = $(this).children('i').attr('class');
			// noinspection JSAnnotator

            let user = JSON.parse(localStorage.getItem('auth_user'))._id;
            let formattedData = {
                sender: user,
                receiver: value
            };

            $(this).html('<i class="fa fa-spinner fa-spin"></i>');
            switch(iClass){
                case 'fa fa-check':
                    socket.emit('removeFriend', formattedData, function(success){
                        console.log(success.success);
                    });

                    $(this).html('<i class="fa fa-plus"></i>');
                    break;
                case 'fa fa-plus':
                    socket.emit('addFriend', formattedData, function(success){
                        console.log(success.success);
                    });
                    $(this).html('<i class="fa fa-check"></i>');

                    break;
            }
		});
		
		$('.req-accept').off().on('click', function (e) {
			e.preventDefault();
			let el = $(this);
			let value = el.attr('value');
			dispatch(actions.acceptFriend(value));
			// noinspection JSAnnotator
			$(this).parent().css('display', 'none');
			let user = JSON.parse(localStorage.getItem('auth_user'))._id;
			let formattedData = {
				sender: user,
				receiver: value
			};

			socket.emit('acceptFriend', formattedData, function(success){
				console.log(success.success);
			});
		});
		
        $('.req-reject').off().on('click', function (e) {
            e.preventDefault();
            let el = $(this);
            let value = el.attr('value');
            dispatch(actions.rejectFriend(value));
            // noinspection JSAnnotator
            $(this).parent().parent().parent().css('display', 'none');
            let user = JSON.parse(localStorage.getItem('auth_user'))._id;
            let formattedData = {
                sender: user,
                receiver: value
            };

            socket.emit('removeFriend', formattedData, function(success){
                console.log(success.success);
            });
        });
	}

	render() {
		let {_id, name, picture, friend, accepted, initiator} = this.props;

		let friendsButton = () => {
			if (friend === false && accepted === false) {
				return (
                    <span ref="btn" value={_id} className="req btn btn-sm">
                        <i className="fa fa-plus"/></span>
				);
			}

			if (friend === true && accepted === false) {
                if(initiator == JSON.parse(localStorage.getItem('auth_user'))._id) {
                    return (
                        <span ref="btn" value={_id} className="req btn btn-sm">
                        <i className="fa fa-check"/></span>
                    );
                }

                if(initiator !== JSON.parse(localStorage.getItem('auth_user'))._id) {
                    return (
                        <span>
                            <span ref="btn" value={_id} className="req-accept btn btn-sm">
                            <i className="fa fa-check" /></span>
                            <span ref="btn" value={_id} className="req-reject btn btn-sm">
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

export default connect()(FriendCard);
