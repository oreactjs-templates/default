import React from 'react';
import loadable from '@oreact/core/loadable';
import runtimeConfig from 'runtimeConfig';

export default {
    routes: [
        {
            address: [runtimeConfig.ROUTE_404],
            component: loadable(() => import('./Component'))
        }
    ]
};
