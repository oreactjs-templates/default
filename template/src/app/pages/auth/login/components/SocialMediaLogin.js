import React, {useEffect, useRef, useState} from 'react';
import {Button, SvgIcon} from '@material-ui/core';
import {useMutation} from "react-apollo";
import jwtService from 'app/services/jwtService';
import {LOGIN_BY_FACEBOOK} from 'app/graphql/mutations/loginByFacebook';
import {LOGIN_BY_GOOGLE} from 'app/graphql/mutations/loginByGoogle';
import {useStores} from '@oreact/core/store';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {GoogleLogin} from 'react-google-login';
import runtimeConfig from 'runtimeConfig';
import {observer} from "mobx-react";


export default observer((props) => {
    const {authStore} = useStores();
    const [facebookLogin, facebookResponse] = useMutation(LOGIN_BY_FACEBOOK);
    const [googleLogin, googleResponse] = useMutation(LOGIN_BY_GOOGLE);

    function onFailure(error) {
        console.log(error)
    }

    useEffect(() => {
        if (facebookResponse && facebookResponse.data && facebookResponse.data.loginByFacebook.user) {
            jwtService.setSession(facebookResponse.data.loginByFacebook.access_token);
            authStore.setUser(facebookResponse.data.loginByFacebook.user);
            authStore.setLoginStatus({success: true});
        } else if (facebookResponse.error) {

        }
    }, [facebookResponse]);

    useEffect(() => {
        if (googleResponse && googleResponse.data && googleResponse.data.loginByGoogle.user) {
            jwtService.setSession(googleResponse.data.loginByGoogle.access_token);
            authStore.setUser(googleResponse.data.loginByGoogle.user);
            authStore.setLoginStatus({success: true});
        } else if (googleResponse.error) {

        }
    }, [googleResponse]);

    function handleFBLogin(response) {
        facebookLogin({variables: {accessToken: response.accessToken}});
    }

    function handleGoogleLogin(response) {
        googleLogin({variables: {accessToken: response.accessToken}});
    }

    return (
        <div className="w-full">

            {runtimeConfig.FACEBOOK_APP_ID &&
                <FacebookLogin
                    appId={runtimeConfig.FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={handleFBLogin}
                    render={renderProps => (
                        <Button variant="outlined" onClick={renderProps.onClick} className={'w-full normal-case mb-16'}>
                            <span style={{color: '#3b5998', width: '24px', height: '24px'}}>
                            <SvgIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                                fill="currentColor"
                                d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.61v-6.97h-2.34V11.3h2.34v-2c0-2.33 1.42-3.6 3.5-3.6 1 0 1.84.08 2.1.12v2.43h-1.44c-1.13 0-1.35.53-1.35 1.32v1.73h2.69l-.35 2.72h-2.34V21h4.59a1 1 0 0 0 .99-1V4a1 1 0 0 0-1-1z"></path></SvgIcon>
                            </span>
                            Log in with Facebook</Button>
                    )}
                />
            }

            {runtimeConfig.GOOGLE_CLIENT_ID &&
                <GoogleLogin
                    clientId={runtimeConfig.GOOGLE_CLIENT_ID}
                    onSuccess={handleGoogleLogin}
                    onFailure={onFailure}
                    render={renderProps => (
                        <Button variant="outlined" onClick={renderProps.onClick} disabled={renderProps.disabled}
                                className={'w-full normal-case'}>
                            <SvgIcon width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none">
                                    <path
                                        d="M20.64 12.2c0-.63-.06-1.25-.16-1.84H12v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z"
                                        fill="#4285F4"></path>
                                    <path
                                        d="M12 21a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26a5.4 5.4 0 0 1-8.09-2.85h-3v2.33A9 9 0 0 0 12 21z"
                                        fill="#34A853"></path>
                                    <path d="M6.96 13.71a5.41 5.41 0 0 1 0-3.42V7.96h-3a9 9 0 0 0 0 8.08l3-2.33z"
                                          fill="#FBBC05"></path>
                                    <path
                                        d="M12 6.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 3.96 7.95l3 2.34A5.36 5.36 0 0 1 12 6.58z"
                                        fill="#EA4335"></path>
                                </g>
                            </SvgIcon>
                            Log in with Google</Button>
                    )}
                />
            }
        </div>
    );
});
