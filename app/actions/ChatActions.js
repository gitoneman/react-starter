import alt from "../alt";

class ChatActions{
    constructor() {
        this.generateActions(
            'getUsersSuccess',
            'getMsgSuccess',
            'getFail'
        );
    }
    getUsers(data){
        this.actions.getUsersSuccess(data);
    }
    getMsg(data){
        this.actions.getMsgSuccess(data);
    }
}
export default alt.createActions(ChatActions);