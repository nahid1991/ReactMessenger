import axios from 'axios';
import qs from 'qs';

// const CHAT_SERVER = 'http://common-messenger.herokuapp.com';
const CHAT_SERVER = 'http://192.168.0.108:8000';
const FACEBOOK_GRAPH = 'https://graph.facebook.com/v2.8/me?fields=email&access_token=';

// axios.defaults.timeout = 5000;

module.exports = {
  facebookLogin: function(id, name, accessToken){
    var requestUrl = `${CHAT_SERVER}/users/facebook_login/`;
    return new Promise((resolve, reject) => {
      this.facebookInfo(accessToken).then(function(response){
        var postData = {
          user_id: id,
          name: name,
          access_key: accessToken,
          email: response
        };

        var config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        };

        axios.post(requestUrl, postData, config).then(function(response){
          localStorage.setItem('loginData', response.data);
          // console.log(response.data);
          resolve(response.data);
        }, function(err){
          reject(new Error('Unable to fetch user data'));
        });
      });
    });

  },

  googleLogin: function(id, name, imageUrl, email){
    var requestUrl = `${CHAT_SERVER}/users/google_login/`;

    return new Promise((resolve, reject) => {
      var postData = {
        user_id: id,
        name: name,
        access_key: 'No',
        email: email,
        image_url: imageUrl
      };

      var config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      };

      axios.post(requestUrl, postData, config).then(function(response){
        localStorage.setItem('loginData', response.data);
        // console.log(response.data);
        resolve(response.data);
      }, function(err){
        reject(new Error('Unable to fetch user data'));
      });
    });

  },


  getUserData: function(){
    var requestUrl = `${CHAT_SERVER}/users/user_info/`;
    var token = localStorage.getItem('loginData');
    // console.log(token);
    var config = {
      headers: {
        'Accept': '*/*',
        'Authorization': "Token " + token
      }
    };

    return new Promise((resolve, reject) => {
      axios.get(requestUrl, config).then(function(response){
        localStorage.setItem('auth_user', JSON.stringify(response.data));
        resolve(response.data);
      }, function(err){
        localStorage.removeItem('loginData');
        localStorage.removeItem('auth_user');
        console.log(err);
        reject(new Error(err));
      });
    });

  },

  facebookInfo: function(accessToken){
    return new Promise((resolve, reject) => {
      var requestUrl = `${FACEBOOK_GRAPH}${accessToken}`;
      axios.get(requestUrl).then(function(res){
        // console.log(res.data.email);
        resolve(res.data.email);
      }, function(err){
        reject(new Error(err));
      });
    });

  }
}
