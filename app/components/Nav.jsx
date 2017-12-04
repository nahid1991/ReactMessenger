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
		localStorage.removeItem('friendsPageNumber');
		localStorage.removeItem('totalPageFriends');
		localStorage.removeItem('searching');
		localStorage.removeItem('friendId');
		window.location.hash = '#/';
	}
	
	render() {
		let {userInfo} = this.props;
		return (
			<div>
				<nav className="navbar navbar-default navbar-fixed-top" style={{height: "% !important"}}>
					<div className="container-fluid">

						<div className="navbar-header">
							<a className="navbar-brand" href="#" style={{display: 'inline'}}>
								<img src="./ghost.png" className="pull-left"
									 style={{maxHeight: "30px", float: "left"}}></img></a>
								<span className="visible-lg visible-md" style={{float: 'left', marginTop: '10px'}}>good ghost </span>
							<ul className="nav navbar-nav pull-right visible-xs dropdown">
								<li className="dropbtn">
									<a href="#">
										<img className="thumb-friend-small-navbar img-thumbnail img-responsive" src={userInfo !== null ? userInfo.picture: ''}/>
									</a>
								</li>
								<div className="dropdown-content">
									<a href="#" onClick={this.logout.bind(this)}>Log out</a>
								</div>
							</ul>
						
						</div>
						<ul className="nav navbar-nav navbar-right visible-lg visible-md visible-sm dropdown">
							<li className="dropbtn">
								<a href="#">
									<img className="thumb-friend-small-navbar img-thumbnail img-responsive" 
									src={userInfo !== null ? userInfo.picture: ''} />
								</a>
								<div className="dropdown-content">
									<a href="#" onClick={this.logout.bind(this)}>Log out</a>
								</div>
							</li>
						</ul>

					</div>
				</nav>
			</div>
		);
	}
}

export default connect()(Nav);
