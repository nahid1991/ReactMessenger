var React = require('react');
var ReactDOM = require('react-dom');
var {hashHistory} = require('react-router');
var {Provider} = require('react-redux');
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

// var TodoApp = require('TodoApp');
// var actions = require('actions');
var store = require('configureStore').configure();

// import firebase from 'app/firebase';
import router from 'app/router';

//
//
//
// firebase.auth().onAuthStateChanged((user) => {
//   if(user){
//     store.dispatch(actions.login(user.uid));
//     store.dispatch(actions.startAddTodos());
//     hashHistory.push('/todos');
//   } else {
//     store.dispatch(actions.logout());
//     hashHistory.push('/');
//   }
// });

require('style!css!sass!applicationStyles');


ReactDOM.render(
  // <div>
  //     <TodoApp />
  // </div>,
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
