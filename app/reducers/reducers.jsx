var moment = require('moment');
var uuid = require('node-uuid');

export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
    ;
};

export var showCompletedReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    }
    ;
};

export var todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                action.todo
            ];
        case 'UPDATE_TODO':
            return state.map((todo) => {
                if (todo.id === action.id) {
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
    }
    ;
};

export var userInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'KEEP_USER_DATA':
            // console.log(action.auth_user);
            if(state.length > 0) {
                return state;
            }
            return [
                action.auth_user
            ];
        case 'REMOVE_USER_DATA':
            // console.log(action.auth_user);
            return [];
        case 'GET_USER_DATA':
            // console.log(action.auth_user);
            return [
                ...state,
                action.auth_user
            ];
        default:
            return state;
    }
    ;
};


export var friendsInfoReducer = (state = [], action) => {
    let newState = null;
    switch (action.type) {
        case 'KEEP_FRIENDS_DATA':
            // console.log(action.auth_user);
            return action.friends;
        case 'REMOVE_FRIENDS_DATA':
            // console.log(action.auth_user);
            return state;
        case 'UPDATE_FRIENDS_LIST':
            newState = state.filter(function(st) {
                return st._id == action.friend
            })[0];
            return [
                newState,
                ...state.filter(function(st){
                    return st._id != action.friend
                })
            ];
        case 'UPDATE_FRIENDS_LIST_RECEIVED':
            newState = action.friend
            return [
                newState,
                ...state.filter(function(st){
                    return st._id != action.friend._id
                })
            ];
        case 'ACCEPT_FRIEND':
            return state.map(function(friend) {
                return (friend._id === action.id) ? {...friend, accepted: true} : friend;
            });
        case 'REJECT_FRIEND':
            newState = state.filter(function(st) {
                return st._id != action.id;
            });
            return newState;
        case 'ADD_REQUEST':
            newState = state;
            newState.unshift(action.data);
            return newState;
        case 'REMOVE_REQUEST':
            newState = state;
            newState = newState.map(function(friend){
                if(friend._id == action.id) {
                    friend.friend = false;
                    friend.initiator = '';
                }
                return friend;
            });
            return newState;
        case 'SEND_REQUEST':
            newState = state;
            newState = newState.map(function(friend){
                if(friend._id == action.id) {
                    friend.friend = true;
                    friend.accepted = false;
                    friend.initiator = action.user;
                }
                return friend;
            });
            return newState;
        default:
            return state;
    }
};

export var friendIdReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FRIEND_ID':
            return action.id;
        default:
            return state;
    };
};

export var messageReducer = (state = [], action) => {
    switch (action.type) {
        case 'KEEP_MESSAGE':
            let newState = state;
            newState = [...newState, action.msg];
            return newState;
        case 'EMPTY_MESSAGES':
            return [];
        default:
            return state;
    }
};