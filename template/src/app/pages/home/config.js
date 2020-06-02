import React from 'react';
import loadable from '@oreact/core/loadable';
import homeStore from './store';

export default {
    settings: {
        layout: {
            type: 'websiteLayout',
            config: {
                style: 'fullwidth',
                scroll: 'content',
                navbar: {
                    display: false
                },
                toolbar: {
                    display: true
                },
                footer:{
                    display: true
                }
            }
        },
        customScrollbars: false,
        theme: {
            main: 'website',
            navbar: 'mainThemeDark',
            toolbar: 'mainThemeLight',
            footer: 'mainThemeDark'
        }
    },
    routes: [
        {
            address: ['/home', '/'],
            exact: true,
            navbar: {
                'id': 'home',
                'title': 'Home',
                'type': 'item',
                'icon': 'home'
            },
            component: loadable(() => import('./Component'), {ssr: true})
        }
    ],
    permissions: {
        admin: {
            home: {
                'read:any': ['*']
            }
        },
        user: {
            home: {
                'read:own': ['*']
            }
        }
    },
    stores: {
        homeStore
    }
};
