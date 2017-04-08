import React from 'react';
// import * as Redux from 'react-redux';

// import * as actions from 'actions';
import {Button, ButtonToolbar} from 'react-bootstrap';
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
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>
                Login with Facebook.
              </p>
              <FacebookLogin
                appId="342612186136243"
                autoLoad={true}
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
