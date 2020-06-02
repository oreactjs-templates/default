export class apolloClient {
    constructor() {
        this._client = {};
        this._mobxState = {};
    }

    set(client) {
        this._client = client;
    }

    get() {
        return this._client;
    }
}

const gqlClient = new apolloClient();
export default gqlClient;
