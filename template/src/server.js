import config from './server/config';
import {oreactApp} from '@oreact/express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import {initializePassport} from './server/services/passport';
import {initializeMongo} from './server/services/mongoose';
import schema from './server/graphql/schema';
import {initializeApollo} from './server/services/apolloServer';
import {authHandler, requestHandler, error404Handler} from './server/middlewares';

// Mongo
initializeMongo();

const app = oreactApp(
    [authHandler],
    [requestHandler],
    {
        cspExtensions: {
            childSrc: [],
            connectSrc: [],
            defaultSrc: [],
            frameSrc: ['accounts.google.com'],
            fontSrc: ['fonts.googleapis.com/css', 'fonts.gstatic.com'],
            imgSrc: [],
            mediaSrc: [],
            manifestSrc: [],
            objectSrc: [],
            scriptSrc: [
                // Allow scripts from cdn.polyfill.io so that we can import the
                // polyfill.
                'cdn.polyfill.io',
                'connect.facebook.net',
                'apis.google.com',
                'accounts.google.com'
            ],
            styleSrc: [
                'cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css',
                'fonts.googleapis.com/css',
            ]
        }
    });

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({extended: true}));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// CORS
app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Allows for cross origin domain request:
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
});

if (config.env !== 'test') app.use(morgan('combined'));

// passport
initializePassport();

// Route not found(404)
app.use(error404Handler);

// Apollo Server
const server = initializeApollo();
app.use('/graphql', (req, res, next) => {
    server.schema = schema;
    next();
});
server.applyMiddleware({app});

// export server app
export default app;
