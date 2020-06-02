import {createUser, loginByFacebook, loginByGoogle, loginByUsernamePassword} from './mutations';
import {
    UserTC
} from 'server/models';

// Register mutations
UserTC.addResolver(createUser);
UserTC.addResolver(loginByFacebook);
UserTC.addResolver(loginByGoogle);
UserTC.addResolver(loginByUsernamePassword);

export * from 'server/models';
