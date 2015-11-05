import alt from "../alt";
import UserActions from "../actions/UserActions";
class UserStore {
  	constructor() {
    	this.bindActions(UserActions);
    	this.username = "";
  	}

  	onGetUserSuccess(data) {
    	this.username = data;
  	}
}

export default alt.createStore(UserStore);