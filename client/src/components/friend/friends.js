import React, { Component } from "react";
import { Switch } from "react-router-dom";
import Header from "./Header";
import AuthRoute from "../AuthRoute";
import Show from "./Show";
import Make from "./Make";
import "./Friends.scss";

export default class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: ""
    };
  }

  render() {
    return (
      <div className="friends">
        <Header />
        <div className="switch">
          <Switch>
            <AuthRoute
              exact={true}
              path="/friend"
              component={Show}
              routeType="protected"
            />
            <AuthRoute
              exact={true}
              path="/friend/invite"
              component={Make}
              routeType="protected"
            />
          </Switch>
        </div>
      </div>
    );
  }
}
