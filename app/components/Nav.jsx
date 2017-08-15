import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Nav extends React.Component {
    logout() {
        var {dispatch} = this.props;
        dispatch(actions.remove_user_data());
        dispatch(actions.remove_friends_data());
        localStorage.removeItem('auth_user');
        localStorage.removeItem('loginData');
        localStorage.removeItem('friends');
        window.location.hash = '#/';
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">hubtalk</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="#" onClick={this.logout.bind(this)}>Log out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default connect()(Nav);
