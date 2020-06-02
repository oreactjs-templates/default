import {EventEmitter} from '@oreact/core/utils';
import Cookies from 'universal-cookie';
import runtimeConfig from 'runtimeConfig';

class jwtService extends EventEmitter {

    /**
     * Set token session
     * @param access_token
     */
    setSession = access_token => {
        const cookies = new Cookies();
        if (access_token) {
            cookies.set('x-access-token', access_token, {path: '/'});

            if (!runtimeConfig.IS_SERVER) {
                localStorage.setItem('x-access-token', access_token);
            }

        } else {
            cookies.remove('x-access-token');

            if (!runtimeConfig.IS_SERVER) {
                localStorage.removeItem('x-access-token');
            }
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('x-access-token');
    };

    logout = () => {
        this.setSession(null);
    };
}

export default new jwtService();
