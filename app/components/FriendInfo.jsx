import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class FriendInfo extends React.Component{
  render () {
    return (
      <div className="col-sm-12 custom-div-sm">
        <img className="thumb-friend img-thumbnail img-circle img-responsive" src="https://graph.facebook.com/100002125714172/picture?type=large" />
          <h4 className="custom-name-top">Angry</h4><h4 class="custom-name"> Owl</h4>
      </div>
    );
  }
}

export default FriendInfo;