import axios from 'axios';
import qs from 'qs';

const CHAT_SERVER = 'http://common-messenger.herokuapp.com';
// const CHAT_SERVER = 'http://192.168.0.108:8000';
const FACEBOOK_GRAPH = 'https://graph.facebook.com/v2.5/me?fields=email&access_token=';

axios.defaults.timeout = 5000;

module.exports = {
  facebookLogin: function(id, name, accessToken){
    var requestUrl = `${CHAT_SERVER}/users/facebook_login/`;

    console.log(requestUrl);
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

      return axios.post(requestUrl, postData, config).then(function(response){
        console.log(response.data);
        localStorage.setItem('loginData', JSON.stringify(response.data));
        return response.data;
      }, function(err){
        throw new Error('Unable to fetch user data');
      });
    });
  },


  getUserData: function(){
    var requestUrl = `${CHAT_SERVER}/users/user_info/`;
    var token = localStorage.getItem('loginData');
    var config = {
      headers: {
        'Accept': '*/*',
        'Authorization': "Token " + JSON.parse(token)
      }
    };

    console.log(config);

    return axios.get(requestUrl, config).then(function(response){
      console.log(response.data);
      localStorage.setItem('auth_user', JSON.stringify(response.data));
      return response.data;
    }, function(err){
      localStorage.removeItem('loginData');
      localStorage.removeItem('auth_user');
      console.log(err);
      throw new Error(err);
    });
  },

  facebookInfo: function(accessToken){
    console.log(accessToken.length);
    var requestUrl = `${FACEBOOK_GRAPH}${accessToken}`;
    return axios.get(requestUrl).then(function(res){
      // console.log(res.data.email);
      return res.data.email;
    }, function(err){
      throw new Error(err);
    });
  }
}
