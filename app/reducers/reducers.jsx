var moment = require('moment');
var uuid = require('node-uuid');

export var searchTextReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch(action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  };
};

export var todosReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];
    case 'UPDATE_TODO':
      return state.map((todo) => {
        if(todo.id === action.id){
            return {
              ...todo,
              ...action.updates
            };
        } else {
          return todo;
        }
      });
    case 'ADD_TODOS':
      return [
        ...state,
        ...action.todos
      ];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    case 'FACEBOOK_LOGIN':
      return {
        id: action.id,
        name: action.name,
        accessToken: action.accessToken
      };
    default:
      return state;
  };
};

export var userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'KEEP_USER_DATA':
      // console.log(action.auth_user);
      return [
        ...state,
        action.auth_user
      ];
    case 'GET_USER_DATA':
      // console.log(action.auth_user);
      return [
        ...state,
        action.auth_user
      ];
    default:
      return state;
  };
};


export var friendsInfoReducer = (state = [], action) => {
  switch (action.type) {
    case 'KEEP_FRIENDS_DATA':
      // console.log(action.auth_user);
      return action.friends;
    default:
      return state;
  };
};
