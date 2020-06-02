import {model, Schema, connection} from 'mongoose';
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import APIError from 'server/utils/APIError';
import transporter from 'server/services/transporter';
import config from 'server/config';
import PasswordGenerator from 'generate-password';
import uuidv1 from 'uuid/v1';
import {schemaComposer, composeWithMongoose} from '@oreact/core/graphql';
import validate from 'mongoose-validator';
import beautifyUnique from 'mongoose-beautiful-unique-validation';

delete connection.models['User'];
const roles = ['admin', 'staff', 'user'];

const ThumbSchema = new Schema({
    url: {
        type: String,
        required: true,
        get: v => `${config.storage.buckets.pages.thumbs.path}/${v}`
    },
    size: {
        type: String,
        enum: ['sm', 'md', 'lg']
    }

}, {
    _id: false,
    toJSON: {getters: true, virtuals: true},
    toObject: {getters: true, virtuals: true}
});


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: 'Two users cannot share the same email ({VALUE})',
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [4, 128],
                message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters',
            })]
    },
    displayName: {
        type: String,
        maxlength: 50
    },
    activationKey: {
        type: String,
        unique: true
    },
    thumbs: {
        sm : ThumbSchema,
        md : ThumbSchema,
        lg : ThumbSchema
    },
    active: {
        type: Boolean,
        default: false
    },
    role: {
        type: [String],
        default: ['user'],
        enum: ['user', 'admin', 'staff']
    },
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    },
    googleProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    }
}, {
    timestamps: true,
    toJSON: {getters: true, virtuals: true},
    toObject: {getters: true, virtuals: true}
});

userSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) {
            return next()
        }

        this.password = bcrypt.hashSync(this.password);

        return next()
    } catch (error) {
        return next(error)
    }
});

userSchema.post('save', async function saved(doc, next) {
    try {

        if (!doc.active) {

            //TODO: Implement confirmation email send.

            /*const mailOptions = {
                from: 'noreply',
                to: this.email,
                subject: 'Confirm creating account',
                html: `<div><h1>Hello new user!</h1><p>Click <a href="${config.hostname}/api/auth/confirm?key=${this.activationKey}">link</a> to activate your new account.</p></div><div><h1>Hello developer!</h1><p>Feel free to change this template ;).</p></div>`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            });*/
        }

        return next()
    } catch (error) {
        return next(error)
    }
});

userSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'displayName', 'email', 'thumbs', 'createdAt', 'role'];

        fields.forEach((field) => {
            transformed[field] = this[field]
        });

        return transformed
    },

    passwordMatches(password) {
        return bcrypt.compareSync(password, this.password)
    }
});

userSchema.statics = {
    roles,

    async findAndGenerateToken(payload) {
        const {email, password} = payload;
        if (!email) throw new APIError('Email must be provided for login');

        const user = await this.findOne({email}).exec();
        if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND);

        const passwordOK = await user.passwordMatches(password);

        if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED);

        if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED);

        return user
    },

    upsertFbUser(accessToken, refreshToken, profile, cb) {
        let that = this;
        return this.findOne({
            'facebookProvider.id': profile.id
        }, function (err, user) {
            // no user was found, lets create a new one
            if (!user) {

                let password = bcrypt.hashSync(PasswordGenerator.generate({
                    length: 10,
                    numbers: true
                }));

                let newUser = new that({
                    displayName: profile.displayName,
                    active: true,
                    email: profile.emails[0].value,
                    password: password,
                    activationKey: uuidv1(),
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function (error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    },

    upsertGoogleUser(accessToken, refreshToken, profile, cb) {
        let that = this;
        return this.findOne({
            'googleProvider.id': profile.id
        }, function (err, user) {
            // no user was found, lets create a new one
            if (!user) {

                let password = bcrypt.hashSync(PasswordGenerator.generate({
                    length: 10,
                    numbers: true
                }));

                let newUser = new that({
                    displayName: profile.displayName,
                    active: true,
                    email: profile.emails[0].value,
                    password: password,
                    activationKey: uuidv1(),
                    googleProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function (error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    }
};

userSchema.plugin(beautifyUnique);
const User = model('User', userSchema);

schemaComposer.delete('User');
export const UserTC = composeWithMongoose(User);

UserTC.removeField('password');
UserTC.removeField('activationKey');

export default User;
