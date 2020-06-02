export default {
    app: process.env.APP,
    env: process.env.NODE_ENV,
    host: process.env.HOST,
    port: process.env.PORT,
    hostname: process.env.HOSTNAME,
    secret: process.env.APP_SECRET,

    mongo: {
        uri: process.env.MONGO_URL
    },

    transporter: {
        service: process.env.TRANSPORTER_SERVICE,
        host: process.env.TRANSPORTER_HOST,
        port: process.env.TRANSPORTER_PORT,
        email: process.env.TRANSPORTER_EMAIL,
        password: process.env.TRANSPORTER_PASSWORD
    },

    facebookAuth: {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_SECRET
    },

    googleAuth: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET
    }

};
