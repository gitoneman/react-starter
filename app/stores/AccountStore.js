import alt from "../alt";
import AccountActions from "../actions/AccountActions";

class AccountStore {
    constructor() {
        this.bindActions(AccountActions);
        this.list = [];
        this.showModal = false;
        //write state
    }

    onGetListSuccess(data){
        this.list = data.reverse();
    }
    onAddCountSuccess(data) {
        this.showModal = false;
        AccountActions.getList();
    }
    onDelCountSuccess() {
        AccountActions.getList();
    }
    onGetSuccess(data) {
        this.movies = data;
    }

    onGetFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(AccountStore);