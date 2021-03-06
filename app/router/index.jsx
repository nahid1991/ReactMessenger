import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
import Chatroom from 'Chatroom';
import Login from 'Login';

var requireLogin = (nextState, replace, next) => {
    if (localStorage.getItem('loginData') == null && localStorage.getItem('auth_user') == null) {
        replace('/');
    }
    next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
    if (localStorage.getItem('loginData') != null && localStorage.getItem('auth_user') != null) {
        replace('/tab');
    }
    next();
};

export default (
    <Router history={browserHistory}>
        <Route>
            <Route path="/">
                <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
            </Route>
            <Route path="tab" component={Chatroom} onEnter={requireLogin}/>
            <Route path="tab/:id" component={Chatroom} onEnter={requireLogin}/>
        </Route>
    </Router>
);
