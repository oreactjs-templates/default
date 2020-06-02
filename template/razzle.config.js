const path = require('path');

module.exports = {
    modify: (config, {target, dev}, webpack) => {
        const appConfig = Object.assign({}, config);

        appConfig.resolve.alias = {
            ...appConfig.resolve.alias,
            graphql: path.resolve(__dirname, 'node_modules/graphql'),
            'passport-google-token': path.resolve(__dirname, 'node_modules/passport-google-token/lib/passport-google-token/strategy')
        };

        appConfig.externals = {
            'graphql-compose-relay': 'commonjs graphql-compose-relay',
            'graphql-compose': 'commonjs graphql-compose',
            'graphql-compose-mongoose': 'commonjs graphql-compose-mongoose',
            'graphql': 'commonjs graphql',
            'apollo-link-schema': 'commonjs apollo-link-schema',
            'graphql-tools': 'commonjs graphql-tools',
            'apollo-server-express': 'commonjs apollo-server-express'
        };

        return appConfig;
    },
    plugins: ['oreact', 'svgr']
};
