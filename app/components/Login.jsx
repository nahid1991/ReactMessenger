import React from 'react';
// import * as Redux from 'react-redux';

// import * as actions from 'actions';
// import {Button, ButtonToolbar} from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import * as actions from 'actions';




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

    dispatch(actions.facebook_login(response.id, response.name, response.accessToken)).then(function(response){
      var loginData = '';

      loginData = localStorage.getItem('loginData');
      if(loginData){
        dispatch(actions.keep_user_data(response));
        setTimeout(function(){
          window.location.hash = '#/tab'
        }, 1000);

          // window.location.hash = '#/tab';
      } else {}
    }, function(err){
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <h1 className="page-title">Most Private Mesenger</h1>
        <div className="row">

          <div className="centered col-sm-offset-1 col-md-offset-3 col-lg-offset-4 col-sm-10 col-md-6 col-lg-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>
                Login with Facebook.
              </p>
              <FacebookLogin
                appId="342612186136243"
                autoLoad={false}
                callback={this.responseFacebook.bind(this)} />
            </div>
          </div>

        </div>
      </div>
    );
  }
};
// export default Redux.connect()(Login);
export default connect()(Login);
