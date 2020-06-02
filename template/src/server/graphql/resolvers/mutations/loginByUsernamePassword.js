import {
    User
} from 'server/models';
import {createToken} from 'server/services/passport';

export default {
    kind: 'mutation',
    name: 'loginByUsernamePassword',
    type: 'JSON',
    args: {
        email: 'String',
        password: 'String'
    },
    resolve: async ({source, args, context, info}) => {
        const user = await User.findAndGenerateToken(args);
        const token = createToken(user.id);
        return {user: user.transform(), access_token: token};
    }
}
