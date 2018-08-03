import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ReactDOM from 'react-dom';
import {GoogleLogin} from 'react-google-login-component';
import GitHubLogin from 'react-github-login';
import {browserHistory} from 'react-router';


export class Login extends React.Component {
    componentWillMount() {
        if (JSON.parse(localStorage.getItem('loginData'))) {
            browserHistory.push('/tab');
        }
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
                browserHistory.push('/tab');
            } else {
            }
        }, function (err) {
            console.log(err);
            ReactDOM.findDOMNode(this.refs.loader).style.display = 'none';
            ReactDOM.findDOMNode(this.refs.error).style.display = 'block';
        });
    }

    // githubLoginSucess(response) {
    //     let {dispatch} = this.props;
    //     console.log(response);
    //     dispatch(actions.githubLogin(response.code)).then(function(res) {
    //         console.log(res);
    //     }, function(err){
    //         console.log(err);
    //         // ReactDOM.findDOMNode(this.refs.loader).style.display = 'none';
    //         // ReactDOM.findDOMNode(this.refs.error).style.display = 'block';
    //     });
    // }

    // githubLoginFailure(response) {
    //     console.error(response);
    // }

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

                            <GoogleLogin
                                socialId="731586613303-jjm4tlkvp3i8lulsk90h2bn9cbah9sn9.apps.googleusercontent.com"
                                class="btn btn-lg btn-danger fa fa-google"
                                scope="profile"
                                responseHandler={this.responseGoogle.bind(this)}
                                buttonText=" | Sign in With Google"/>
                            <hr/>

                            {/* <hr/>
                            <GitHubLogin clientId="cc7461fe0ebe018c2fb9" 
                                className="btn btn-lg fa fa-github"
                                redirectUri="http://localhost:3000/#/"
                                scope="read:user"
                                buttonText=" | Sign in with Github"
                                onSuccess={this.githubLoginSucess.bind(this)}
                                onFailure={this.githubLoginFailure.bind(this)}
                                />
                            <hr/> */}

                        </div>
                    </div>

                </div>
            </div>
        );
    }
};
// export default Redux.connect()(Login);
export default connect()(Login);
