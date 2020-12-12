import React, { Component } from "react";
import { Redirect, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { Login } from "./components/Login/Login.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { LoginRoute } from "./components/LoginRoute.js";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './components/Dashboard/Dashboard.css';

class App extends Component {

      render() {
        return (
            <div className="App">
                <div className="App-content">
                    <Switch>
                        <LoginRoute exact path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <Redirect to="/404"/>
                    </Switch>
                </div>
            </div>
        );
    }
}
export default App;
