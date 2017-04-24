// var React = require('react');
// var {connect} = require('react-redux');
import React from 'react';
import {connect} from 'react-redux';
import Todo from 'Todo';
// import * as TodoAPI from 'TodoAPI';
// var TodoAPI = require('TodoAPI');
// var Todo = require('Todo');


export class TodoList extends React.Component {
  render (){
    var {todos, showCompleted, searchText} = this.props;
    var renderTodos = () => {
      var filteredTodos = TodoAPI.filteredTodos(todos, showCompleted, searchText);
      if(filteredTodos.length == 0){
        return (
          <p className="container__message">Nothing To Do</p>
        );
      }
      return filteredTodos.map((todo) => {
        return (
          <Todo key={todo.id} {...todo}/>
        );
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
};

export default connect(
  (state) => {
    return state;
  }
)(TodoList);
