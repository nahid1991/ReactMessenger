import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';
import FriendInfo from 'FriendInfo';
import {connect} from 'react-redux';

export class ProfileDetail extends React.Component{
  render () {
    return (
      <div className="col-sm-3 col-md-3 col-lg-3 custom-div pre-scrollable visible-sm visible-md visible-lg">
        <FriendInfo/>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return state;
  }
)(ProfileDetail);
