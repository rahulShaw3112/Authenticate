import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import { AuthContextProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";

axios.defaults.withCredentials = true;

class App extends React.Component {
  render() {
    return (
      <AuthContextProvider>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute exact path="/home" component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    );
  }
}

export default App;
