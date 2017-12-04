import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ReactDOM from 'react-dom';
import {GoogleLogin} from 'react-google-login-component';


export class Login extends React.Component {
    componentWillMount() {
        if (JSON.parse(localStorage.getItem('loginData'))) {
            window.location.hash = '#/tab';
        }
    }
    responseFacebook(response) {
        let {dispatch} = this.props;
        ReactDOM.findDOMNode(this.refs.loader).style.display = 'block';
        ReactDOM.findDOMNode(this.refs.error).style.display = 'none';
        dispatch(actions.facebookLogin(response.id, response.name, response.accessToken)).then(function (response) {
            let loginData = '';
            loginData = localStorage.getItem('loginData');
            if (loginData) {
                dispatch(actions.keepUserData(response));
                window.location.hash = '#/tab';
            } else {
            }
        }, function (err) {
            console.log(err);
            ReactDOM.findDOMNode(this.refs.loader).style.display = 'none';
            ReactDOM.findDOMNode(this.refs.error).style.display = 'block';
        });
    }


    responseGoogle(googleUser) {
        let {dispatch} = this.props;
        let access_token = googleUser.getAuthResponse().access_token;
        ReactDOM.findDOMNode(this.refs.loader).style.display = 'block';
        ReactDOM.findDOMNode(this.refs.error).style.display = 'none';
        dispatch(actions.googleLogin(access_token)).then(function (response) {
            let loginData = '';
            loginData = localStorage.getItem('loginData');
            if (loginData) {
                dispatch(actions.keepUserData(response));
                window.location.hash = '#/tab';
            } else {
            }
        }, function (err) {
            console.log(err);
            ReactDOM.findDOMNode(this.refs.loader).style.display = 'none';
            ReactDOM.findDOMNode(this.refs.error).style.display = 'block';
        });
    }

    render() {
        return (
            <div>
                <h1 className="page-title"><img src='./ghost.png' className="centered"  style={{maxHeight: "50px"}}></img>good ghost</h1>
                <div className="row">

                    <div
                        className="centered col-sm-offset-1 col-md-offset-3 col-lg-offset-4 col-sm-10 col-md-6 col-lg-4">
                        <div className="callout callout-auth">
                            <h3>Login</h3>

                            <p ref="error" style={{color: 'red', display: 'none'}}>Error in logging in</p>
                            <img ref="loader" src='./loader.gif' className="centered"
                                 style={{marginLeft: '35%', width: '25%', display: 'none', zIndex: '0'}}></img>
                            <FacebookLogin
                                appId="342612186136243"
                                cssClass="btn btn-lg btn-primary fa fa-facebook"
                                autoLoad={false}
                                textButton=" | Sign in with Facebook"
                                callback={this.responseFacebook.bind(this)}/>
                            <hr/>

                            <GoogleLogin
                                socialId="731586613303-jjm4tlkvp3i8lulsk90h2bn9cbah9sn9.apps.googleusercontent.com"
                                class="btn btn-lg btn-danger fa fa-google"
                                scope="profile"
                                responseHandler={this.responseGoogle.bind(this)}
                                buttonText=" | Sign in With Google"/>
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
