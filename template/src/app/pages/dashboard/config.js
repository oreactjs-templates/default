import React from 'react';
import loadable from '@oreact/core/loadable';
import dashboardStore from './store';

export default {
    settings: {
        layout: {
            type: 'appLayout',
            config: {
                style: 'fullwidth',
                scroll: 'content',
                navbar: {
                    display: true
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
            address: ['/dashboard'],
            navbar: {
                'id': 'dashboard',
                'title': 'Dashboard',
                'type': 'item',
                'icon': 'dashboard'
            },
            component: loadable(() => import('./Component'), {ssr: true}),
            allowOnlyIfLoggedIn: true
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
        dashboardStore
    }
};
