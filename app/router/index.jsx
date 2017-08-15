import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import Chatroom from 'Chatroom';
import Login from 'Login';

var requireLogin = (nextState, replace, next) => {
    if (!JSON.stringify(localStorage.getItem('loginData')) && !JSON.parse(localStorage.getItem('auth_user'))) {
        replace('/');
    }
    next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
    if (JSON.stringify(localStorage.getItem('loginData')) && JSON.parse(localStorage.getItem('auth_user'))) {
        replace('/tab');
    }
    next();
};

export default (
    <Router history={hashHistory}>
        <Route>
            <Route path="/">
                <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
            </Route>
            <Route path="tab" component={Chatroom} onEnter={requireLogin}/>
            <Route path="tab/:id" component={Chatroom} onEnter={requireLogin}/>
        </Route>
    </Router>
);
