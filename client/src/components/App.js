import React from "react";
import {
  // Route,
  Switch
} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Login from "./session/Login";
import Register from "./session/Register";
import Friends from "./friend/friends";
import Nav from "./Nav";

const App = () => {
  return (
    <div>
      <h1>Badreads</h1>
      <Nav />
      <Switch>
        <AuthRoute
          exact={true}
          path="/login"
          component={Login}
          routeType="auth"
        />
        <AuthRoute
          exact={true}
          path="/register"
          component={Register}
          routeType="auth"
        />
        <AuthRoute
          exact={false}
          path="/friend"
          component={Friends}
          routeType="protected"
        />
      </Switch>
    </div>
  );
};

export default App;
