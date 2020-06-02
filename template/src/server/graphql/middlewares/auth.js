/**
 * Auth middleware
 * @param roles
 * @returns {function(*, *=, *=, *=, *=): *}
 */
export default (roles = []) => async (resolve, source, args, context, info) => {

    /*if (context && !context.user) {
        const {req, res} = context;
        let {user} = await promisifiedAuthenticate(req, res, 'jwt', {session: false});
        context.user = user;
    }*/

    return resolve(source, args, context, info);
};
