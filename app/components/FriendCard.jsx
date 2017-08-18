import React from 'react';
import {connect} from 'react-redux';

var store = require('configureStore').configure();

export class FriendCard extends React.Component {
    render() {
        var {_id, name, picture} = this.props;
        var formattedName = name.split(" ");
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <a href={"#/tab/" + _id} title={name}>
                        <img
                            className="thumb-friend img-thumbnail img-circle img-responsive visible-md visible-lg"
                            src={picture}/>
                        <img className="thumb-friend-small img-thumbnail img-circle img-responsive visible-xs visible-sm"
                             src={picture}/>
                        <div>
                            <p className="custom-name-top visible-sm visible-lg visible-md"><strong>{name}</strong></p>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default connect()(FriendCard);
