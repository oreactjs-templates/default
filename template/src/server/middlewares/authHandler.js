import {promisifiedAuthenticate} from "server/services/passport";
import {setLoggedInUser} from '@oreact/express';

export default async (req, res, next) => {

    let {user, info} = await promisifiedAuthenticate(req, res, 'jwt', {session: false});
    if (info && info.exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({error: "Access token has expired, please login to obtain a new one"});
    }
    // Set loggedIn user
    setLoggedInUser(req, user);
    next();
}
