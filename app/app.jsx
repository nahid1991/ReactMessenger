var React = require('react');
var ReactDOM = require('react-dom');
// var {hashHistory} = require('react-router');
var {Provider} = require('react-redux');
var store = require('configureStore').configure();

import router from 'app/router';

require('style!css!sass!applicationStyles');


ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
