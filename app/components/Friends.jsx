import React from 'react';
import FriendCard from 'FriendCard';
import {connect} from 'react-redux';
import * as actions from 'actions';
var store = require('configureStore').configure();
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class Friends extends React.Component{
  render () {

    var renderFriends = () => {
      var {friendsInfo} = this.props;
      if(friendsInfo.length == 0){
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


    return(
      <div className="col-xs-4 col-sm-2 col-md-2 col-lg-2 custom-div pre-scrollable border-line">
        <form>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search"></input>
          </div>
        </form>
        {renderFriends()}
      </div>
    );
  }
}

const mapStateToProps = function(store){
  return {
    friendsInfo: store.friendsInfo
  };
}

export default connect(mapStateToProps)(Friends);
