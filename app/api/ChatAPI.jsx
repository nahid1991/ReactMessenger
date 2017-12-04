import axios from 'axios';

const CHAT_SERVER = 'http://localhost:4201';
const FACEBOOK_GRAPH = 'https://graph.facebook.com/v2.8/me?fields=email&access_token=';
const GOOGLE_GRAPH = 'https://www.googleapis.com/oauth2/v3/userinfo?access_token=';
const GITHUB_GRAPH = 'https://github.com/login/oauth/access_token';

module.exports = {
	searchFriends: function() {
		let requestUrl = `${CHAT_SERVER}/users/friends?page=1`;
		
		return new Promise((resolve, reject) => {
			let token = localStorage.getItem('loginData');
			let config = {
				headers: {
					'Accept': '*/*',
					'Authorization': "Token " + token
				}
			};
			
			axios.get(requestUrl, config).then(function(response) {
				resolve(response.data);
			}, function(err){
				reject(new Error(err));
			});
		})
	},
	
	searchPeople: function (letters = '', page = 1) {

		let requestUrl = `${CHAT_SERVER}/people/${letters}?page=${page}`;
		return new Promise((resolve, reject) => {
            let token = localStorage.getItem('loginData');
            let config = {
                headers: {
                    'Accept': '*/*',
                    'Authorization': "Token " + token
                }
            };
			
			axios.get(requestUrl, config).then(function(response){
				// console.log(response.data);
				resolve(response.data);
			}, function(err){
				// console.log(err);
				reject(new Error(err));
			});
		})
	},
	
	friends: function (pageNumber) {
		let page
		if(pageNumber == 'undefined'){
			page = parseInt(1);
		} else {
			page = parseInt(pageNumber);
		}
		let requestUrl = `${CHAT_SERVER}/users/?page=${page}`;
		return new Promise((resolve, reject) => {
			let token = localStorage.getItem('loginData');
			// console.log(token);
			let config = {
				headers: {
					'Accept': '*/*',
					'Authorization': "Token " + token
				}
			};
			
			axios.get(requestUrl, config).then(function (response) {
				localStorage.setItem('friends', JSON.stringify(response.data));
				resolve(response.data);
			}, function (err) {
				reject(new Error(err));
			});
		});
		
	},
	
	facebookLogin: function (id, name, accessToken) {
		let requestUrl = `${CHAT_SERVER}/users/facebook_login/`;
		return new Promise((resolve, reject) => {
			this.facebookInfo(accessToken).then(function (response) {
				try {
					let postData = {
						user_id: id,
						name: name,
						access_key: accessToken,
						email: response + '@facebook.com'
					};
					
					let config = {
						headers: {
							'Content-Type': 'application/json',
							'Accept': '*/*'
						}
					};
					
					axios.post(requestUrl, postData, config).then(function (response) {
						localStorage.setItem('loginData', response.data);
						resolve(response.data);
					}, function (err) {
						reject(new Error('Unable to fetch user data', err));
					});
				} catch (err) {
					console.log('Unable to fetch user data', err);
				}
			});
		});
		
	},
	
	googleLogin: function (accessToken) {
		let requestUrl = `${CHAT_SERVER}/users/google_login/`;
		
		return new Promise((resolve, reject) => {
			this.googleInfo(accessToken).then(function (response) {
				let postData = {
					user_id: response.sub,
					name: response.name,
					access_key: accessToken,
					email: response.hasOwnProperty('email') ? response.email:response.sub+'@google.com',
					image_url: response.picture
				};
				let config = {
					headers: {
						'Content-Type': 'application/json',
						'Accept': '*/*'
					}
				};
				
				axios.post(requestUrl, postData, config).then(function (response) {
					localStorage.setItem('loginData', response.data);
					// console.log(response.data);
					resolve(response.data);
				}, function (err) {
					reject(new Error('Unable to fetch user data'));
				});
			});
		});
	},

	githubLogin: function (code) {
		return new Promise((resolve, reject) => {
			this.githubInfo(code).then(function(response){
				console.log(response);
			}, function(err) {
				reject(new Error('Unable to fetch user data'));
			});
		})
	},
	
	
	getUserData: function () {
		let requestUrl = `${CHAT_SERVER}/users/user_info/`;
		let token = localStorage.getItem('loginData');
		// console.log(token);
		let config = {
			headers: {
				'Accept': '*/*',
				'Authorization': "Token " + token
			}
		};
		
		return new Promise((resolve, reject) => {
			axios.get(requestUrl, config).then(function (response) {
				localStorage.setItem('auth_user', JSON.stringify(response.data));
				resolve(response.data);
			}, function (err) {
				localStorage.removeItem('loginData');
				localStorage.removeItem('auth_user');
				console.log(err);
				reject(new Error(err));
			});
		});
		
	},
	
	facebookInfo: function (accessToken) {
		return new Promise((resolve, reject) => {
			let requestUrl = `${FACEBOOK_GRAPH}${accessToken}`;
			axios.get(requestUrl).then(function (res) {
				resolve(res.data.id);
			}, function (err) {
				reject(new Error(err));
			});
		});
		
	},
	
	
	googleInfo: function (accessToken) {
		return new Promise((resolve, reject) => {
			let requestUrl = `${GOOGLE_GRAPH}${accessToken}`;
			axios.get(requestUrl).then(function (res) {
				resolve(res.data);
			}, function (err) {
				reject(new Error(err));
			});
		});
	},

	githubInfo: function (code) {
		return new Promise((resolve, reject) => {
			let requestUrl = `${GITHUB_GRAPH}?client_id=cc7461fe0ebe018c2fb9&client_secret=ba06f72aa8bd3e928ff9f0bced9fc4bf265fb147&code=${code}`;
			
			let config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				}
			};
			axios.post(requestUrl, {}, config).then(
				function(res){
					resolve(res.data);
				}, function(err) {
					reject(new Error(err));
				}
			);
		});
	},

	addFriend: function (id) {
		return new Promise((resolve, reject) => {
            let requestUrl = `${CHAT_SERVER}/users/make_friends/${id}`;
            let token = localStorage.getItem('loginData');
            let config = {
                headers: {
                    'Accept': '*/*',
                    'Authorization': "Token " + token
                }
            };

            axios.get(requestUrl, config).then(function (res){
                resolve(res.data);
            }, function(err){
                reject(new Error(err));
            });
		});
	},

    removeFriend: function (id) {
        return new Promise((resolve, reject) => {
            let requestUrl = `${CHAT_SERVER}/users/remove_friends/${id}`;
            let token = localStorage.getItem('loginData');
            let config = {
                headers: {
                    'Accept': '*/*',
                    'Authorization': "Token " + token
                }
            };

            axios.get(requestUrl, config).then(function (res){
                resolve(res.data);
            }, function(err){
                reject(new Error(err));
            });
        });
    }
};
