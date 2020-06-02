import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import {SchemaLink} from "apollo-link-schema";
import schema from '../graphql/schema';

export const getApolloClient = (req, res) => {

    // Apollo client
    const cache = new InMemoryCache();
    return new ApolloClient({
        ssrMode: true,
        link: new SchemaLink({
            schema, context: {req, res}
        }),
        cache,
        resolvers: {}
    });

}
