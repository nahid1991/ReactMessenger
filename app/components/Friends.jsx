import React from 'react';
import FriendCard from 'FriendCard';
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class Friends extends React.Component{
  render () {
    return (
      <div className="col-xs-4 col-sm-2 col-md-2 col-lg-2 custom-div pre-scrollable border-line">
        <form>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search"></input>
          </div>
        </form>
        <FriendCard/>
      </div>
    );
  }
}

export default Friends;
