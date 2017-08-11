import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
import moment from 'moment';
import ChatAPI from 'ChatAPI';

export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};


export var startAddTodo = (text) => {
    return (dispatch, getState) => {
        var todo = {
            text: text,
            completed: false,
            createdAt: moment().unix(),
            completedAt: null
        };
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

        return todoRef.then(() => {
            dispatch(addTodo({
                ...todo,
                id: todoRef.key
            }));
        });
    };
};


export var toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    }
};


export var addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    }
};

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
};

export var startAddTodos = () => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var todosRef = firebaseRef.child(`users/${uid}/todos`);

        return todosRef.once('value').then((snapshot) => {
            var todos = snapshot.val() || {};
            var parsedTodos = [];

            Object.keys(todos).forEach((todoId) => {
                parsedTodos.push({
                    id: todoId,
                    ...todos[todoId]
                });
            });
            dispatch(addTodos(parsedTodos));
        });
    };
};


export var updateTodo = (id, updates) => {
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    }
};

export var startToggleTodo = (id, completed) => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
        var updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };

        return todoRef.update(updates).then(() => {
            dispatch(updateTodo(id, updates));
        });
    };
};

export var login = (uid) => {
    return {
        type: 'LOGIN',
        uid
    };
};

export var startLogin = () => {
    return (dispatch, getState) => {
        firebase.auth().signInWithPopup(githubProvider).then((result) => {
            console.log('Auth worked! ', result);
        }, (error) => {
            console.log('Unable to auth ', error);
        });
    };
};

export var logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export var startLogout = () => {
    return (dispatch, getState) => {
        firebase.auth().signOut().then(() => {
            console.log('Logged out!');
        });
    };
};

// Messenger app starts from here


export var facebook_login = (id, name, accessToken) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            ChatAPI.facebookLogin(id, name, accessToken).then(function (response) {
                ChatAPI.getUserData().then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(new Error(err));
                });
            }, function (err) {
                reject(new Error(err));
            });
        })
    }
}


export var users = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            ChatAPI.friends().then(function (response) {
                // console.log(response);
                // dispatch(keep_friends_data(response));
                resolve(response);
            }, function (err) {
                reject(new Error(err));
            });
        })
    }
}

export var google_login = (accessToken) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            // ChatAPI.googleLogin(accessToken);
            ChatAPI.googleLogin(accessToken).then(function (response) {
                ChatAPI.getUserData().then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(new Error(err));
                });
            }, function (err) {
                reject(new Error(err));
            });
        });
    }
}

export var get_user_data = (auth_user) => {
    return (dispatch, getState) => {
        dispatch(keep_user_data(auth_user));
    }
}


export var keep_user_data = (auth_user) => {
    return {
        type: 'KEEP_USER_DATA',
        auth_user
    }
}

export var remove_user_data = () => {
    return {
        type: 'REMOVE_USER_DATA'
    }
}

export var keep_friends_data = (friends) => {
    return (dispatch, getState) => {
        dispatch(store_friends_data(friends));
    }
}


export var store_friends_data = (friends) => {
    return {
        type: 'KEEP_FRIENDS_DATA',
        friends
    }
}

export var remove_friends_data = () => {
    return {
        type: 'REMOVE_FRIENDS_DATA'
    }
}
