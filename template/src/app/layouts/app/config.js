import Layout from './Layout';

export default {
    title: 'Application Layout',
    component: Layout,
    defaults: {
        style: 'fullwidth',
        scroll: 'content',
        navbar: {
            display: false,
            folded: false,
            position: 'left'
        },
        toolbar: {
            display: true,
            style: 'fixed',
            position: 'bottom'
        },
        footer: {
            display: false,
            style: 'fixed',
            position: 'bottom'
        },
        leftSidePanel: {
            display: true
        },
        rightSidePanel: {
            display: true
        }
    }
};

