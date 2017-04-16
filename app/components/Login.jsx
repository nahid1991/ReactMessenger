import React from 'react';
// import * as Redux from 'react-redux';

// import * as actions from 'actions';
// import {Button, ButtonToolbar} from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';



export class Login extends React.Component {
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
    console.log(response.id + ' ' + response.name);
    console.log(response.accessToken);
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
                callback={this.responseFacebook} />
            </div>
          </div>

        </div>
      </div>
    );
  }
};
// export default Redux.connect()(Login);
export default Login;
