import React from 'react';
import {connect} from 'react-redux';

var $ = require('jquery');

var store = require('configureStore').configure();

export class FriendCard extends React.Component {
	componentDidMount() {
		$('.req').on('click', function () {
			$(this).closest('a').toggleClass('btn-default btn-primary');
		});
	}
	
	componentDidUpdate() {
		$('.req').on('click', function () {
			$('.req').toggleClass('btn-default btn-primary');
		});
	}
	
	render() {
		var {_id, name, picture, friend} = this.props;
		
		var friendsButton = () => {
			if (friend == false) {
				return (
					<div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 req-parent">
						<a ref="btn" className="btn btn-sm btn-default req text-center">
							<i className="fa fa-plus"></i></a>
					</div>
				);
			}
		}
		
		return (
			<div className="row">
				<div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<a href={"#/tab/" + _id} title={name}>
						<img
							className="thumb-friend img-thumbnail img-responsive visible-md visible-lg"
							src={picture}/>
						<img
							className="thumb-friend-small img-thumbnail img-responsive visible-xs visible-sm"
							src={picture}/>
						<div>
							<p className="custom-name-top visible-sm visible-lg visible-md">{name}</p>
						</div>
					</a>
				</div>
				{friendsButton()}
			</div>
		);
	}
}

export default connect()(FriendCard);
