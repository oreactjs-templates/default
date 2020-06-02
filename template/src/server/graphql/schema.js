import {schemaComposer} from '@oreact/core/graphql';
import {
    UserTC
} from './resolvers';
import {authMiddleware} from './middlewares';


// create GraphQL Schema with all available resolvers for User Type
schemaComposer.Query.addFields({
    getUser: UserTC.getResolver('findById', [authMiddleware([])]),
});

// For debug purposes you may display resolver internals in the following manner:
// console.log(UserTC.getResolver('findMany').toString());
schemaComposer.Mutation.addFields({
    // User
    loginByUsernamePassword: UserTC.getResolver('loginByUsernamePassword', [authMiddleware([])]),
    loginByGoogle: UserTC.getResolver('loginByGoogle', [authMiddleware([])]),
    loginByFacebook: UserTC.getResolver('loginByFacebook', [authMiddleware([])]),
    createUser: UserTC.getResolver('createUser', [authMiddleware([])]),
});


const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;


