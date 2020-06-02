import React, {useEffect, useRef, useState} from 'react';
import Formsy from 'formsy-react';
import {OTextField} from '@oreact/ui';
import {Button, InputAdornment, Icon} from '@material-ui/core';
import {observer} from "mobx-react";
import {useStores} from '@oreact/core/store';
import jwtService from 'app/services/jwtService';
import {CREATE_USER} from 'app/graphql/mutations/createUser';
import {useMutation} from "react-apollo";
import parseValidationErrors from 'app/services/parseValidationErrors';

let __timedInterval;
export default observer((props) => {
    const {authStore} = useStores();
    const [createUser, {data, error}] = useMutation(CREATE_USER);
    const register = authStore.register;
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if (data && data.createUser && data.createUser.user) {
            jwtService.setSession(data.createUser.access_token);
            authStore.setUser(data.createUser.user);
            authStore.setRegisterStatus({success: true});
            authStore.setLoginStatus({success: true});
        }
    }, [data]);

    useEffect(() => {
        if (error && error.graphQLErrors && error.graphQLErrors[0].extensions) {
            authStore.setRegisterStatus({success: false});
            formRef.current.updateInputsWithError(parseValidationErrors(error.graphQLErrors[0].extensions.exception));
            __timedInterval && clearInterval(__timedInterval);
            __timedInterval = setTimeout(() => {
                formRef.current.setInputValidationErrors({});
            }, 5000);
        } else {
            formRef.current.setInputValidationErrors({});
        }
    }, [error]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        createUser({variables: {...model}});
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
                    name="displayName"
                    label="Display name"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                           color="action">person</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <OTextField
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Email"
                    validations="isEmail"
                    validationErrors={{
                        isEmail: 'Please enter a valid email'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                           color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <OTextField
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    validations="equalsField:password-confirm,minLength:4"
                    validationErrors={{
                        equalsField: 'Passwords do not match',
                        minLength: 'Min password length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                           color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <OTextField
                    className="mb-16"
                    type="password"
                    name="password-confirm"
                    label="Confirm Password"
                    validations="equalsField:password"
                    validationErrors={{
                        equalsField: 'Passwords do not match'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20"
                                                                           color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="REGISTER"
                    disabled={!isFormValid}
                    value="legacy"
                >
                    Register
                </Button>

            </Formsy>

        </div>
    );
})
