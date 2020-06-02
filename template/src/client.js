import React from 'react';
import 'typeface-muli';
import {hydrate, render} from 'react-dom';
import {loadableReady} from '@oreact/core/loadable'
import {ApolloProvider} from 'react-apollo';
import {DOMTree, rootNode} from '@oreact/core/client';
import 'mobx-react-lite/batchingForReactDom';
import {getApolloClient} from "./app/services/apolloClient";

// Get apollo client
const gqlClient = getApolloClient();

let DOM = <ApolloProvider client={gqlClient}>
    <DOMTree/>
</ApolloProvider>;

const renderApp = () => {
    if (rootNode().hasChildNodes() === true) {
        loadableReady(() => {
            hydrate(DOM, rootNode());
        });
    } else {
        render(DOM, rootNode());
    }
};

if (module.hot) {
    module.hot.accept();
    module.hot.accept('@oreact/core/app', () => {
        renderApp();
    });
}

// Render client app
renderApp();
