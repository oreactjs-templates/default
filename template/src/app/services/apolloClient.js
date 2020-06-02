import fetch from "node-fetch";
import bluebird from "bluebird";
import {createHttpLink} from "apollo-link-http";
import runtimeConfig from "../../runtimeConfig";
import {ApolloLink} from "apollo-link";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import apolloClient from "../../@common/apolloClient";

export const getApolloClient = () => {

    // Apollo client
    fetch.Promise = bluebird;
    const httpLink = createHttpLink({
        uri: runtimeConfig.GQL_SERVER_ADDRESS,
        fetch: fetch,
        credentials: 'same-origin'
    });

    const middlewareLink = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                'x-access-token': (window.localStorage.getItem('x-access-token') || null)
            }
        });
        return forward(operation);
    });

    const client = new ApolloClient({
        // Remember that this is the interface the SSR server will use to connect to the
        // API server, so we need to ensure it isn't firewalled, etc
        link: middlewareLink.concat(httpLink),
        cache: new InMemoryCache().restore(window.__SERVER_STATE__),
        ssrForceFetchDelay: 100,
        resolvers: {
            /*Mutation : {
                addUploadedPhoto: (_root, variables, {cache, getCacheKey}) => {

                    const currentPage = client.query({ query: GET_USER_PHOTOS, variables: {
                            perPage: 20,
                            page: 1,
                            sort: 'USERID__CREATEDAT_DESC'
                        }}).then(result => {
                            console.log(result);
                        });


                }
            }*/
        }
    });

    // Set global client object
    apolloClient.set(client);

    return client;

}
