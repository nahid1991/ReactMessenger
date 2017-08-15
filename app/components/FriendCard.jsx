import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

var store = require('configureStore').configure();

// import {Navbar, Button, ButtonToolbar} from 'react-bootstrap';

export class FriendCard extends React.Component {
    render() {
        var {_id, name, picture} = this.props;
        var formattedName = name.split(" ");
        return (
            <div>
                <a href={"#/tab/" + _id} title={name}>
                    <img
                        className="thumb-friend img-thumbnail img-circle img-responsive visible-md visible-lg"
                        src={picture}/>
                    <img className="thumb-friend-small img-thumbnail img-circle img-responsive visible-xs visible-sm"
                         src={picture}/>
                    <div>
                        <p className="custom-name-top visible-lg visible-md"><strong>{name}</strong></p>
                    </div>
                </a>
            </div>
        );
    }
}

export default connect()(FriendCard);
