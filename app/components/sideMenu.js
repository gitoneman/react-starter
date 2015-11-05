import React from "react";
import AccordionItem from "./sideMenu-item.react";
import menu from "../menu.config";
import _ from "underscore";

function getInit(){
	var hash = window.location.hash.slice(2);


	for(var i in menu){
		if(hash == ""){
			return i;
		}
		var arr = [];

		_.each(menu[i],function(item){
			arr.push(item.href);
		})

		if(_.contains(arr,hash)){
			return i;
		}
	}
}

class sideMenu extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	now: getInit()
	    }
	    this.clickHead = this.clickHead.bind(this);
  	}
  	componentDidMount() {

  	}
  	componentWillUnmount() {
	   
  	}
  	render(){
  		var menu = this.props.data;
		var menus = [];
		var now = this.state.now;

		for(var k in menu){
			menus.push(<AccordionItem key={k} head={k} data={menu[k]} onclick={this.clickHead} active={now == k?true:false}/>)
		}
		return (
			<div className='accordion'>
				{menus}
			</div>
		);
  	}
  	clickHead(o){
		this.setState({
			now:o.head 
		});
	}
}

export default sideMenu;