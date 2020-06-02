import {observable, action} from 'mobx'

export default class Store {

    @observable
    homeData = 'ffffffff'

    constructor(initialState) {
        if (initialState) {
            this.homeData = initialState.homeData;
        }
    }

    @action
    setElementDialogVisibility(status) {
        this.homeData = status
    }

    toJSON() {
        return {
            homeData: this.homeData
        };
    }
}
