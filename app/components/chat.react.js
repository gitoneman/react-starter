import React from "react";
import ChatStore from "../stores/ChatStore";
import ChatActions from "../actions/ChatActions";
import UserStore from "../stores/UserStore";
import {Button,Glyphicon} from "react-bootstrap";

var socket;
class chat extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = ChatStore.getState();
	    this.onChange = this.onChange.bind(this);
	    this.send = this.send.bind(this);
	    this.press = this.press.bind(this);
  	}
  	componentDidMount() {
	    ChatStore.listen(this.onChange);
	    //初始actions
	    //ChatActions.;
	    setTimeout(function(){
    		if(!socket){
	    		socket = io.connect();

	    		socket.emit('login',UserStore.getState().username)
		    	socket.on('users',function(data){
					ChatActions.getUsers(data.users);
		    	})
		    	socket.on('message',function(data){
					ChatActions.getMsg(data);
		    	})
	    	}else{
	    		socket.connect();
	    		socket.emit('login',UserStore.getState().username)
	    	}
    	},300);
  	}
  	componentWillUnmount() {
	    ChatStore.unlisten(this.onChange);
	    socket.disconnect();
  	}
  	componentDidUpdate() {
  		var d = this.refs.room;
		d.scrollTop = d.scrollHeight;
		$(this.refs.text).val("");
  	}
  	onChange(state) {
	    this.setState(state);
  	}
  	render(){
  		var users = this.state.users.map(function(item,i){
			return (
				<li key={i}>{ item }</li>
			)
		});
		var messages = this.state.message.map(function(item,i){
			return (
				<div className="chat-room-item" key={i}>
					<span className={ UserStore.getState().username == item.name ? "pull-right" : "pull-left"}>
						<span className="msg">{item.msg}</span>
						<Glyphicon glyph="user" className="logo"/>
					</span>
				</div>
			)
		});
		return (
			<div className="g-cnt">
				<div className="chat">
					<div className="chat-list">
						<div className="chart-list-title">
							在线用户列表({this.state.users.length})
						</div>
						<ul>
							{users}
						</ul>
					</div>
					<div className="chat-room">
						<div className="chat-room-body" ref="room">
							{messages}
						</div>
						<div className="chat-room-text">
							<textarea ref="text" onKeyDown={this.press}></textarea>
						</div>
						<div className="chat-room-send">
							<Button className="pull-right" onClick={this.send}>发送</Button>
							<span className="pull-right tip">可以按enter发送</span>
						</div>
					</div>
				</div>
			</div>
		);
  	}
  	send(){
		var value = $(this.refs.text).val();
		socket.emit("message",value);
	}
	press(e){
		if(e.keyCode == 13){
			this.send();
			return false;
		}
	}
}

export default chat;