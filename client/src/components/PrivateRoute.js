import React from "react";
import Loading from "./Loading";
import { Redirect, Route } from "react-router-dom";
import AuthContext from '../context/AuthContext';

class PrivateRoute extends React.Component {
  static contextType = AuthContext;
  render() {
    const { component, ...rest } = this.props;
    if (this.context && this.context.isLoggedIn == null) {
      return <Loading />;
    }
    if (this.context && !this.context.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <Route {...rest} component={component} />
    );
  }
}

export default PrivateRoute;
