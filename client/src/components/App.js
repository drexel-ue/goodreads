import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Login from "./session/Login";
import Register from "./session/Register";
import Nav from "./Nav";

const App = () => {
  return (
    <div>
      <h1>Badreads</h1>
      <Nav />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute
          exact
          path="/register"
          component={Register}
          routeType="auth"
        />
      </Switch>
    </div>
  );
};

export default App;
