import React from 'react';
import FriendCard from 'FriendCard';
import {connect} from 'react-redux';

var store = require('configureStore').configure();
var $ = require('jquery');
import * as actions from 'actions';

export class Friends extends React.Component {
    componentWillMount(){
        var {dispatch} = this.props;
        dispatch(actions.store_friends_data(JSON.parse(localStorage.getItem('friends'))));
    }

    searchFriends(){
        var searches = this.refs.search.value;
        if(searches == ''){
            this.forceUpdate();
        } else {
            console.log(searches);
        }
    }

    render() {

        var renderFriends = () => {
            var {friendsInfo} = this.props;
            if (friendsInfo.length == 0) {
                return (
                    <p>No Friends online</p>
                );
            }
            return friendsInfo.map((friends) => {
                return (
                    <FriendCard key={friends._id} {...friends}/>
                );
            });
        };


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
