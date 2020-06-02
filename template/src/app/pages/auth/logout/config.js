import loadable from '@oreact/core/loadable';
import runtimeConfig from 'runtimeConfig';

export default {
    routes: [
        {
            address: runtimeConfig.ROUTE_LOGOUT,
            component: loadable(() => import('./Component'), {ssr: true})
        }
    ]
};

