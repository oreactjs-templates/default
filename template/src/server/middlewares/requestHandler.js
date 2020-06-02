"use strict";
import React from 'react';
import {ApolloProvider, getMarkupFromTree} from 'react-apollo';
import {DOMTree, ServerHTML} from '@oreact/core/server';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {getApolloClient} from '../services/apolloClient';

/**
 * Handle web requests for server side renderings
 * @param req
 * @param res
 */
export default async (req, res) => {

    const {
        pageProperties: {
            routerContext,
            styleSheets
        },
        nonce
    } = res.locals;

    // Get apollo client
    const gqlClient = getApolloClient(req, res);
    const app = <ApolloProvider client={gqlClient}>
        <DOMTree {...res.locals.pageProperties} reqUrl={req.url}/>
    </ApolloProvider>;

    // Get data and markup from tree
    const appString = await getMarkupFromTree({
        tree: app, renderFunction: (App) => renderToString(styleSheets.collect(App))
    });

    // Generate the html response.
    const html = renderToStaticMarkup(
        <ServerHTML
            reactAppString={appString}
            nonce={nonce}
            locals={res.locals}
            apolloState={gqlClient.extract()}
        />,
    );

    if (routerContext.url) {
        return res.redirect(routerContext.url)
    } else {
        return res.status(routerContext.statusCode || 200).send(`<!DOCTYPE html>${html}`);
    }
};
