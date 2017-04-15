import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import TodoApp from 'TodoApp';
import Chatroom from 'Chatroom';
import Login from 'Login';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
  if(!firebase.auth().currentUser){
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if(firebase.auth().currentUser){
    replace('/todos');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route>
      <Route path="/">
        <Route path="tab" component={Chatroom}/>
        <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
        <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
      </Route>
    </Route>
  </Router>
);
