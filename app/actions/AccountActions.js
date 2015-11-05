import alt from "../alt";

class AccountActions{
    constructor() {
        this.generateActions(
            'getListSuccess',
            'addCountSuccess',
            'delCountSuccess'
        );
    }
    getList(){
        $.ajax({type:"get",url:"/account"})
        .done(data => {
            this.actions.getListSuccess(data);
        })
    }
    addCount(value) {
        $.ajax({
            url: '/account/add',
            type: 'post',
            data: value,
        })
        .done(data => {
            if(data.code == 0){
                this.actions.addCountSuccess(data.data);
                toastr.success("新增成功！")
            }else{
                toastr.error("新增不成功！")
            }
        })  
    }
    delCount(id){
        $.ajax({
            url:"/account/del",
            type:"post",
            data:{
                id:id
            }
        })
        .done(data => {
            if(data.code == 0){
                this.actions.delCountSuccess();
                toastr.success("删除成功！");
            }else{
                toastr.error("删除不成功！")
            }
        })
    }
}
export default alt.createActions(AccountActions);