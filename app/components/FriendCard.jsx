import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
var store = require('configureStore').configure();
// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class FriendCard extends React.Component{
  render () {
    var {name, picture} = this.props;
    var formattedName = name.split(" ");
    console.log(JSON.stringify(name));
    return (
      <div>
        <a href="" className="btn btn-sm btn-default custom-btn" title={name}>
          <img className="thumb-friend img-thumbnail img-circle img-responsive visible-sm visible-md visible-lg" src={picture} />
          <img className="thumb-friend-small img-thumbnail img-circle img-responsive visible-xs" src={picture} />
          <div className="visible-lg visible-md visible-sm">
            <h4 className="custom-name-top">{formattedName[0]}</h4><h4 className="custom-name">{formattedName[1]}</h4>
          </div></a>
      </div>
    );
  }
}

export default connect()(FriendCard);
