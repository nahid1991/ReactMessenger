import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';
import {connect} from 'react-redux';



export class FriendInfo extends React.Component{
  render () {
    var {userInfo} = this.props;
    return (
      <div className="col-sm-12 custom-div-sm">
        <img className="thumb-friend img-thumbnail img-circle img-responsive" src={userInfo[0].picture} />
          <h4 className="custom-name-top">{userInfo[0].name} </h4>
      </div>
    );
  }
}



export default connect()(FriendInfo);
