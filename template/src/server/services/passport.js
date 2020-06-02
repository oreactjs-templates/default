import config from 'server/config';
import {User} from 'server/models';
import PassportJWTStrategy from 'passport-jwt';
import Cookies from 'universal-cookie';
import FacebookTokenStrategy from 'passport-facebook-token';
import GoogleTokenStrategy from 'passport-google-token';
import jwt from 'jsonwebtoken';
import passport from 'passport';

/**
 * Create token
 * @param userId
 * @returns {*}
 */
export const createToken = (userId) => {
    return jwt.sign({sub: userId}, config.secret, {
        expiresIn: "1d"
    });
};

export const jwtStrategy = new PassportJWTStrategy.Strategy({
    secretOrKey: config.secret,
    jwtFromRequest: function (req) {
        const cookies = new Cookies(req.headers.cookie || req.headers['x-access-token'])
        let token = null;
        if (req) {
            token = cookies.get('x-access-token') || null;
        }
        return token;
    }
}, (payload, done) => {
    User.findById(payload.sub, '-password -activationKey', (err, user) => {
        if (err) {
            return done(err, {});
        }
        if (user) {
            return done(null, user, payload);
        } else {
            return done(null, {});
        }
    })
});

/**
 * Promisified Auth
 * @param req
 * @param res
 * @param name
 * @param options
 * @returns {Promise<any> | Promise}
 */
export const promisifiedAuthenticate = (req, res, name, options) => new Promise(
    (resolve, reject) => passport.authenticate(name, options, (err, user, info) => {
        if (err) reject(err);
        else resolve({user, info});
    })(req, res),
);

/**
 * Auth by facebook
 * @param req
 * @param res
 * @returns {Promise<any> | Promise}
 */
export const authenticateFacebook = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('facebook-token', {session: false}, (err, data, info) => {
        if (err) reject(err);
        resolve({data, info});
    })(req, res);
});

/**
 * Auth by Google
 * @param req
 * @param res
 * @returns {Promise<any> | Promise}
 */
export const authenticateGoogle = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('google-token', {session: false}, (err, data, info) => {
        if (err) reject(err);
        resolve({data, info});
    })(req, res);
});


/**
 * Initialize passport strategies
 */
export const initializePassport = () => {
    // passport JWT
    passport.use('jwt', jwtStrategy);

    // password Facebook
    if(config.facebookAuth.clientID && config.facebookAuth.clientSecret){
        const facebookStrategy = new FacebookTokenStrategy({
                clientID: config.facebookAuth.clientID,
                clientSecret: config.facebookAuth.clientSecret
            },
            function (accessToken, refreshToken, profile, done) {
                User.upsertFbUser(accessToken, refreshToken, profile, function (err, user) {
                    return done(err, user);
                });
            });

        passport.use(facebookStrategy);
    }

    // password Google
    if(config.googleAuth.clientID && config.googleAuth.clientSecret){
        const googleStrategy = new GoogleTokenStrategy({
                clientID: config.googleAuth.clientID,
                clientSecret: config.googleAuth.clientSecret
            },
            function (accessToken, refreshToken, profile, done) {
                User.upsertGoogleUser(accessToken, refreshToken, profile, function (err, user) {
                    return done(err, user);
                });
            });

        passport.use(googleStrategy);
    }

}
