import Layout from './Layout';

export default {
    title: 'Website layout',
    component: Layout,
    defaults: {
        style: 'fullwidth',
        scroll: 'content',
        navbar: {
            display: true,
            folded: false,
            position: 'left'
        },
        toolbar: {
            display: true,
            style: 'fixed',
            position: 'below'
        },
        footer: {
            display: false,
            style: 'fixed',
            position: 'below'
        },
        leftSidePanel: {
            display: true
        },
        rightSidePanel: {
            display: true
        }
    }
};

