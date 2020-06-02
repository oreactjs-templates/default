import config from 'server/config';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;
mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
});

mongoose.connection.on('error', (err) => {
    console.log(`Could not connect to MongoDB because of ${err}`);
    process.exit(1)
});

if (config.env === 'dev') {
    mongoose.set('debug', true)
}

export const initializeMongo = () => {
    mongoose.connect(config.mongo.uri, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    mongoose.set('useCreateIndex', true);
    return mongoose.connection
}

