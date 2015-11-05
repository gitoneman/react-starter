import React from "react";
import MailStore from "../stores/MailStore";
import MailActions from "../actions/MailActions";
import {Button,Panel} from "react-bootstrap";
var t = require('tcomb-form');
var Form = t.form.Form;

var fields = {
	to: t.Str,
    subject: t.Str,
    text: t.Str
}

var options = {
	fields: {
	    subject: {
	    	label:"邮件主题",
	        type: 'text',
	        hasError: false,
			error:function(v){
				return "不能为空"
			},							
			help:"提示：填写邮件主标题",
	    },
	    to: {
	    	label:"接收人",
	        type: 'email',
	        hasError: false,
			error:function(v){
				return "不能为空"
			},							
			help:"提示：填写邮件接收人",
	    },
	    text: {
	    	label:"邮件内容",
	        type: 'textarea',
	        hasError: false,
			error:function(v){
				return "不能为空"
			},							
			help:"提示：填写邮件内容",
	    }
	},
		
};

class mail extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = MailStore.getState();
	    this.onChange = this.onChange.bind(this);
	    this.clickHandle = this.clickHandle.bind(this);
  	}
  	componentDidMount() {
	    MailStore.listen(this.onChange);
	    //初始actions
	    //MailActions.;
  	}
  	componentWillUnmount() {
	    MailStore.unlisten(this.onChange);
  	}
  	onChange(state) {
	    this.setState(state);
  	}
  	render(){
  		var mail = t.struct(fields);
		return (
			<div className="g-cnt">
				<div className="mail">
					<Form 
						type={mail} 
						ref="form" 
						options={options} 
						value={this.state.value}/>
						
	        		<Button bsStyle="primary" disabled={this.state.sending == false ? false : true } onClick={this.clickHandle}>
	        			{ this.state.sending == false ? "发送邮件" : "邮件发送中..."}
	        		</Button>
				</div>
			</div>
			
		);
  	}
  	clickHandle(){
		var value = this.refs.form.getValue();
		if(value){
			MailActions.sendMail(value);
		}
		console.log(value)
	}
}

export default mail;