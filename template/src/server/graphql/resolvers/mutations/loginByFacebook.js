import {
    User
} from 'server/models';
import {createToken, authenticateFacebook} from 'server/services/passport';

export default {
    kind: 'mutation',
    name: 'loginByFacebook',
    type: 'JSON',
    args: {
        accessToken: 'String'
    },
    resolve: async ({source, args, context}) => {
        context.req.body = {
            ...context.req.body,
            access_token: args.accessToken
        };

        const {data, info} = await authenticateFacebook(context.req, context.res);

        if (data && data._id) {
            const user = await User.findById(data._id, '-password -activationKey');
            const token = createToken(user._id);
            return {user: user, access_token: token};
        } else if (info) {
            switch (info.code) {
                case 'ETIMEDOUT':
                    return (new Error('Failed to reach Facebook: Try Again'));
                default:
                    return (new Error('something went wrong'));
            }
        }
        return {}
    }
}
