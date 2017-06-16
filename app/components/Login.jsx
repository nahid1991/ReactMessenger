import React from 'react';
// import * as Redux from 'react-redux';

// import * as actions from 'actions';
// import {Button, ButtonToolbar} from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login-component';




export class Login extends React.Component {
  componentWillMount(){
    if(JSON.parse(localStorage.getItem('loginData'))){
      window.location.hash = '#/tab';
    }
  }
  // constructor (props) {
  //   super(props);
  //   this.onLogin = this.onLogin.bind(this);
  // }
  // onLogin() {
  //   var {dispatch} = this.props;
  //
  //   dispatch(actions.startLogin());
  // }
  responseFacebook(response) {
    var {dispatch} = this.props;
    ReactDOM.findDOMNode(this.refs.loader).style.display = 'block';
    ReactDOM.findDOMNode(this.refs.error).style.display = 'none';
    // console.log(ReactDOM.findDOMNode(this.refs.loader).style);
    dispatch(actions.facebook_login(response.id, response.name, response.accessToken)).then(function(response){
      var loginData = '';
      loginData = localStorage.getItem('loginData');
      if(loginData){
        console.log(response);
        dispatch(actions.keep_user_data(response));
        dispatch(actions.users()).then(function(res){
          console.log(res);
          window.location.hash = '#/tab';
        }, function(err){
          console.log(err);
        });
      } else {}
    }, function(err){
      console.log(err);
      ReactDOM.findDOMNode(this.refs.loader).style.display = 'none';
      ReactDOM.findDOMNode(this.refs.error).style.display = 'block';
    });
  }

  // responseGoogle(response) {
  //   var {dispatch} = this.props;
  //   ReactDOM.findDOMNode(this.refs.loader).style.display = 'block';
  //   ReactDOM.findDOMNode(this.refs.error).style.display = 'none';
  //   // console.log(ReactDOM.findDOMNode(this.refs.loader).style);
  //   dispatch(actions.google_login(response.profileObj.googleId,
  //     response.profileObj.name, response.profileObj.imageUrl, response.profileObj.email)).then(function(response){
  //     var loginData = '';
  //
  //     loginData = localStorage.getItem('loginData');
  //     if(loginData){
  //       dispatch(actions.keep_user_data(response));
  //       dispatch(actions.users()).then(function(res){
  //         console.log(res);
  //         window.location.hash = '#/tab';
  //       }, function(err){
  //         console.log(err);
  //       });
  //
  //     } else {}
  //   }, function(err){
  //     console.log(err);
  //     ReactDOM.findDOMNode(this.refs.loader).style.display = 'none';
  //     ReactDOM.findDOMNode(this.refs.error).style.display = 'block';
  //   });
  // }

  responseGoogle(googleUser) {
    var {dispatch} = this.props;
    var access_token = googleUser.getAuthResponse().access_token;
    ReactDOM.findDOMNode(this.refs.loader).style.display = 'block';
    ReactDOM.findDOMNode(this.refs.error).style.display = 'none';
    dispatch(actions.google_login(access_token)).then(function(response){
      var loginData = '';
      loginData = localStorage.getItem('loginData');
      if(loginData){
        console.log(response);
        dispatch(actions.keep_user_data(response));
        dispatch(actions.users()).then(function(res){
          console.log(res);
          window.location.hash = '#/tab';
        }, function(err){
          console.log(err);
        });
      } else {}
    }, function(err){
      console.log(err);
      ReactDOM.findDOMNode(this.refs.loader).style.display = 'none';
      ReactDOM.findDOMNode(this.refs.error).style.display = 'block';
    });
  }

  render() {
    return (
      <div>
        <h1 className="page-title">hubtalk</h1>
        <div className="row">

          <div className="centered col-sm-offset-1 col-md-offset-3 col-lg-offset-4 col-sm-10 col-md-6 col-lg-4">
            <div className="callout callout-auth">
              <h3>Login</h3>

              <p ref="error" style={{color: 'red', display:'none'}}>Error in logging in</p>
              <img ref="loader" src='./loader.gif' className="centered" style={{marginLeft: '35%', width: '25%', display:'none', zIndex:'0'}}></img>
              <FacebookLogin
                appId="342612186136243"
                cssClass="btn btn-lg btn-primary"
                autoLoad={false}
                callback={this.responseFacebook.bind(this)} />
              <br/>
              <hr/>

              <GoogleLogin socialId="731586613303-jjm4tlkvp3i8lulsk90h2bn9cbah9sn9.apps.googleusercontent.com"
                    class="btn btn-lg btn-danger"
                    scope="profile"
                    responseHandler={this.responseGoogle.bind(this)}
                    buttonText="Login With Google"/>
              <hr/>

            </div>
          </div>

        </div>
      </div>
    );
  }
};
// export default Redux.connect()(Login);
export default connect()(Login);
