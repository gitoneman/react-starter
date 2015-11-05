import alt from "../alt";

class UserActons{
    constructor() {
        this.generateActions(
            'getUserSuccess'
        );
    }
    getUser() {
        $.ajax({ type:'get',url: '/userinfo' })
        .done(data => {
            this.actions.getUserSuccess(data);
        })
    }
}
export default alt.createActions(UserActons);