import React, { Component } from "react";
import Header from "./header";
import "./friends.scss";

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
      </div>
    );
  }
}
