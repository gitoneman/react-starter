import React from 'react';
var render = require('react-dom').render;
//var createBrowserHistory = require('history/lib/createBrowserHistory');
import createHistory from "history/lib/createHashHistory";
import { Router,Route,Link,IndexRoute} from "react-router";

var history = createHistory({
  queryKey: false
});

import Menu from "./components/menu.react";
import SideMenu from "./components/sideMenu";
import Movies from "./components/movies.react";
import Weather from "./components/weather.react";
import Account from "./components/account.react";
import Chat from "./components/chat.react";
import Mail from "./components/mail.react";
import menu from "./menu.config";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="g-doc">
                <div className="g-sd">
                    <div className="home-logo">HOME SYSTEM</div>
                    <SideMenu data={menu}/>
                </div>
                <div className="g-mn">
                    <Menu />
                    {this.props.children}
                </div>
            </div>
        )
    }
}

render((
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Movies}/>
            <Route path="weather" component={Weather}/>
            <Route path="account" component={Account}/>
            <Route path="chat" component={Chat}/>
            <Route path="mail" component={Mail}/>
      </Route>
    </Router>

),document.getElementById("app"));


