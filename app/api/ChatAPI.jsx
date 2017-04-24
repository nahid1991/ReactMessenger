import axios from 'axios';

const CHAT_SERVER = 'http://common-messenger.herokuapp.com';
// const CHAT_SERVER = 'http://192.168.0.108:8000';
const FACEBOOK_GRAPH = 'https://graph.facebook.com/v2.5/me?fields=email&access_token=';

module.exports = {
  facebookLogin: function(id, name, accessToken){
    var requestUrl = `${CHAT_SERVER}/users/login/`;
    var fbResponse = this.facebookInfo(accessToken);


    return axios.post(requestUrl, {
      user_id: id,
      name: name,
      access_key: accessToken,
      email: fbResponse.email
    }).then(function(response){
      console.log(response);
    }, function(err){
      throw new Error('Unable to fetch user data');
    });
  },

  facebookInfo: function(accessToken){
    var requestUrl = `${FACEBOOK_GRAPH}${accessToken}`;
    return axios.get(requestUrl).then(function(res){
      // console.log(res.data.email);
      return res.data.email;
    }, function(err){
      throw new Error(err);
    });
  }
}
