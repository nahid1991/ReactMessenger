import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';
import FriendInfo from 'FriendInfo';
import {connect} from 'react-redux';
var store = require('configureStore').configure();

export class ProfileDetail extends React.Component{
  render () {
    return (
      <div className="col-sm-3 col-md-3 col-lg-3 custom-div pre-scrollable visible-sm visible-md visible-lg">
        <FriendInfo user={this.props.userInfo}/>
      </div>
    );
  }
}


const mapStateToProps = function(store){
  return {
    userInfo: store.userInfo.user
  }
}
export default connect(mapStateToProps)(ProfileDetail);
