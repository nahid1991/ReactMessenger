import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

let $ = require('jquery');

export class FriendCard extends React.Component {
	componentDidMount() {
        let {dispatch} = this.props;
		$('.req').off().on('click', function (e) {
		    e.preventDefault();
			let el = $(this);
			let value = el.attr('value');
			let iClass = $(this).children('i').attr('class');
			// noinspection JSAnnotator
            switch(iClass){
                case 'fa fa-check':
                    $(this).html('<i class="fa fa-spinner fa-spin"></i>');
                    dispatch(actions.removeFriend(value)).then(function(response){
                        console.log(JSON.stringify(response));
                    }, function(err) {
                        console.log(err);
                    });
                    $(this).html('<i class="fa fa-plus"></i>');
                    break;
                case 'fa fa-plus':
                    $(this).html('<i class="fa fa-spinner fa-spin"></i>');
                    dispatch(actions.addFriend(value)).then(function(response){
                    }, function(err) {
                        console.log(err);
                    });
                    $(this).html('<i class="fa fa-check"></i>');
                    break;
            }
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

			if (friend === true && accepted === false && initiator === JSON.parse(localStorage.getItem('auth_user'))._id) {
                return (
                    <span ref="btn" value={_id} className="req btn btn-sm">
                        <i className="fa fa-check"/></span>
                );
			}
		};
		
		return (
		<div>
			<div className="row">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 friend-card">
                    <a href={"#/tab/" + _id} title={name}>
                        <img
                            className="thumb-friend img-thumbnail img-responsive visible-md visible-lg"
                            src={picture}/>
                        <img
                            className="thumb-friend-small img-thumbnail img-responsive visible-xs visible-sm"
                            src={picture}/>
                        <p className="custom-name-top">{name}</p>
                    </a>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 req-btn">
                    {friendsButton()}
                </div>
			</div>
            <hr/>
		</div>
		);
	}
}

export default connect()(FriendCard);
