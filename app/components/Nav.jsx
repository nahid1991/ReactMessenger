import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Nav extends React.Component {
	logout() {
		let {dispatch} = this.props;
		dispatch(actions.removeUserData());
		dispatch(actions.removeFriendsData());
		localStorage.removeItem('auth_user');
		localStorage.removeItem('loginData');
		localStorage.removeItem('friends');
        localStorage.removeItem('friendId');
		window.location.hash = '#/';
	}
	
	render() {
		let {userInfo} = this.props;
		return (
			<div>
				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container-fluid">

						<div className="navbar-header">
							<a className="navbar-brand" href="#" style={{display: 'inline'}}>
								<span className="visible-lg visible-md">good ghost </span>
								<img src="./ghost.png" className="pull-left" style={{maxHeight: "50px"}}></img></a>
							<ul className="nav navbar-nav pull-right visible-xs">
								<li>
									<a href="#" onClick={this.logout.bind(this)}>
										<img className="thumb-friend-small img-thumbnail img-circle img-responsive
										 visible-xs visible-sm" src={userInfo.picture}/>
									</a>
								</li>
							</ul>
						
						</div>
						<ul className="nav navbar-nav navbar-right visible-lg visible-md visible-sm ">

							<li>
								<a href="#" onClick={this.logout.bind(this)}>
									<img className="thumb-friend-small img-thumbnail img-circle
									img-responsive visible-xs visible-sm" src={userInfo.picture}/>
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default connect()(Nav);
