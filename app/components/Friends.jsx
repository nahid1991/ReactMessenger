import React from 'react';
import FriendCard from 'FriendCard';
import {connect} from 'react-redux';

let store = require('configureStore').configure();
let $ = require('jquery');
import * as actions from 'actions';

export class Friends extends React.Component {
	componentWillMount(){
		let {dispatch} = this.props;
		dispatch(actions.findFriends()).then(function (res) {
			dispatch(actions.storeFriendsData(res.docs));
            localStorage.setItem('friendsPageNumber', res.page);
            localStorage.setItem('totalPageFriends', res.pages);
            localStorage.setItem('searching', false);
		}, function (err) {
			console.log(err);
		});
	}
	
	searchFriends(){
		let {dispatch} = this.props;
		let searches = this.refs.search.value;
		if(searches == ''){
			localStorage.removeItem('friendsSearchPageNumber');
			dispatch(actions.findFriends()).then(function (res) {
				dispatch(actions.storeFriendsData(res.docs));
				localStorage.setItem('friendsPageNumber', res.page);
                localStorage.setItem('totalPageFriends', res.pages);
                localStorage.setItem('searching', false);
			}, function (err) {
				console.log(err);
			});
			this.forceUpdate();
		} else {
			dispatch(actions.searchPeople(searches)).then(function (res) {
				dispatch(actions.storeFriendsData(res.docs));
				localStorage.setItem('friendsPageNumber', res.page);
                localStorage.setItem('totalPageFriends', res.pages);
                localStorage.setItem('searching', true);
			}, function (err) {
				console.log(err);
			});
		}
	}
	
	render() {
		let renderFriends = () => {
			let {friendsInfo} = this.props;
			if (friendsInfo.length == 0) {
				return (
					<p>No one is here</p>
				);
			}
			return friendsInfo.map((friends) => {
				return (
					<FriendCard key={friends._id} {...friends}/>
				);
			});
		}
		
		return (
			<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 custom-div pre-scrollable border-line">
				<form>
					<div className="form-group">
						<input type="text" ref="search" className="form-control" onKeyUp={this.searchFriends.bind(this)} placeholder="Search"></input>
					</div>
				</form>
				{renderFriends()}
			</div>
		);
	}
}

const mapStateToProps = function (store) {
	return {
		friendsInfo: store.friendsInfo
	};
}

export default connect(mapStateToProps)(Friends);
