import {
    User
} from 'server/models';
import {createToken} from 'server/services/passport';
import uuidv1 from "uuid/v1";

export default {
    kind: 'mutation',
    name: 'createUser',
    type: 'JSON',
    args: {
        displayName: 'String',
        email: 'String',
        password: 'String'
    },
    resolve: async ({source, args, context, info}) => {
        const user = new User({
            ...args,
            activationKey: uuidv1()
        });
        const savedUser = await user.save();
        // Create Token and send it to client
        const token = createToken(user.id);
        return {user: savedUser.transform(), access_token: token};
    }
}
