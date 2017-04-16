import React from 'react';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class FriendCard extends React.Component{
  render () {
    return (
      <div>
        <a href="#" className="btn btn-sm btn-default custom-btn">
          <img className="thumb-friend img-thumbnail img-circle img-responsive visible-sm visible-md visible-lg" src="https://graph.facebook.com/100002125714172/picture?type=large" />
          <img className="thumb-friend-small img-thumbnail img-circle img-responsive visible-xs" src="https://graph.facebook.com/100002125714172/picture?type=large" />
          <div className="visible-lg visible-md visible-sm">
            <h4 className="custom-name-top">Angry</h4><h4 className="custom-name"> Owl</h4>
          </div></a>
      </div>
    );
  }
}

export default FriendCard;