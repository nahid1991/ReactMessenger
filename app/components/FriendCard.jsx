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
                <a href={"#/tab/" + _id} className="btn btn-sm btn-link custom-btn text-center" title={name}>
                    <img
                        className="thumb-friend img-thumbnail img-circle img-responsive visible-sm visible-md visible-lg"
                        src={picture}/>
                    <img className="thumb-friend-small img-thumbnail img-circle img-responsive visible-xs"
                         src={picture}/>
                    <div className="visible-lg visible-md visible-sm">
                        <p className="custom-name-top name"><strong>{name}</strong></p>
                    </div>
                </a>
            </div>
        );
    }
}

export default connect()(FriendCard);
