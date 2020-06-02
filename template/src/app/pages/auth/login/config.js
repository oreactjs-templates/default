import runtimeConfig from 'runtimeConfig';
import loadable from '@oreact/core/loadable';

export default {
    settings: {
        layout: {
            type: 'websiteLayout',
            config: {
                style: 'fullwidth fullheight',
                navbar: {
                    display: false
                },
                toolbar: {
                    display: true
                },
                footer:{
                    display: false
                }
            }
        },
        customScrollbars: false,
        theme: {
            main: 'website',
            navbar: 'website',
            toolbar: 'website',
            footer: 'website'
        }
    },
    routes: [
        {
            address: [runtimeConfig.ROUTE_LOGIN],
            exact: true,
            component: loadable(() => import('./Component'), {ssr: true})
        }
    ]
};

