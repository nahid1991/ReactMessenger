import React from 'react';
import {connect} from 'react-redux';

let $ = require('jquery');

export class FriendCard extends React.Component {
	componentDidMount() {
		$('.req').on('click', function () {
			let el = $(this);
			$(this).slideToggle(300);
			let value = el.attr('value');
			let iClass = $(this).children('i').attr('class');
			if(iClass.indexOf('fa-check') >= 0) {
				$(this).html('<i class="fa fa-plus"></i>Add Friend');
			} else {
				$(this).html('<i class="fa fa-check"></i>Pending Request');
			}
		});
	}
	
	componentDidUpdate() {
		$('.req').on('click', function () {
			$(this).slideToggle(300);
		});
	}
	
	render() {
		let {_id, name, picture, friend, accepted, initiator} = this.props;
		
		let friendsButton = () => {
			if (friend === false && accepted === false) {
				return (
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 req-parent">
						<a ref="btn" value={_id} className="btn btn-sm btn-custom-two req text-center">
							<i className="fa fa-plus"></i>Add Friend</a>
					</div>
				);
			}

			if (friend === true && accepted === false && initiator === JSON.parse(localStorage.getItem('auth_user'))._id) {
                return (
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 req-parent">
						<a ref="btn" value={_id} className="btn btn-sm btn-custom-two req text-center">
							<i className="fa fa-check"></i>Pending Request</a>
					</div>
                );
			}
		}
		
		return (
		<div>
			<div className="row">
				<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<a href={"#/tab/" + _id} title={name}>
						<img
							className="thumb-friend img-thumbnail img-responsive visible-md visible-lg"
							src={picture}/>
						<img
							className="thumb-friend-small img-thumbnail img-responsive visible-xs visible-sm"
							src={picture}/>
						<div>
							<p className="custom-name-top">{name}</p>
						</div>
					</a>
				</div>
			</div>
			<div className="row">
				{friendsButton()}
			</div>
		</div>
		);
	}
}

export default connect()(FriendCard);
