import React, {useEffect, useRef, useState} from 'react';
import {Button, Divider, Typography, InputAdornment, Icon} from '@material-ui/core';
import {OTextField} from '@oreact/ui';
import Formsy from 'formsy-react';
import jwtService from 'app/services/jwtService';
import {observer} from "mobx-react";
import {useStores} from '@oreact/core/store';
import {useMutation} from "react-apollo";
import {LOGIN_BY_USERNAME_PASSWORD} from 'app/graphql/mutations/loginByUsernamePassword';
import parseValidationErrors from 'app/services/parseValidationErrors';
let __timedInterval;
export default observer((props) => {
    const {authStore} = useStores();
    const [userLogin, {data, error}] = useMutation(LOGIN_BY_USERNAME_PASSWORD);
    const login = authStore.login;
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if (data && data.loginByUsernamePassword && data.loginByUsernamePassword.user) {
            jwtService.setSession(data.loginByUsernamePassword.access_token);
            authStore.setUser(data.loginByUsernamePassword.user);
            authStore.setLoginStatus({success: true});
        }
    }, [data]);

    useEffect(() => {
        if (error && error.graphQLErrors && error.graphQLErrors[0].extensions) {
            authStore.setLoginStatus({success: false});
            formRef.current.updateInputsWithError(parseValidationErrors(error.graphQLErrors[0].extensions.exception));
            __timedInterval && clearInterval(__timedInterval);
            __timedInterval = setTimeout(() => {
                formRef.current.setInputValidationErrors({});
            }, 5000);
        } else {
            formRef.current.setInputValidationErrors({});
        }
    }, [error]);

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        userLogin({variables: {...model}});
    }

    return (
        <div className="w-full">
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <OTextField
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Username/Email"
                    value=""
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <OTextField
                    className="mb-8"
                    type="password"
                    name="password"
                    label="Password"
                    value=""
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="LOG IN"
                    disabled={!isFormValid}
                    value="legacy">Login</Button>
            </Formsy>

        </div>
    );
});
