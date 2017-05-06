import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';
import {connect} from 'react-redux';



export class FriendInfo extends React.Component{
  render () {
    var {user} = this.props;
    return (
      <div className="col-sm-12 custom-div-sm">
        <img className="thumb-friend img-thumbnail img-circle img-responsive" src="https://graph.facebook.com/100002125714172/picture?type=large" />
          <h4 className="custom-name-top">{user.first_name} </h4><h4 className="custom-name">{user.last_name}</h4>
      </div>
    );
  }
}



export default connect()(FriendInfo);
