import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./header.scss";

export default withRouter(
  class Header extends Component {
    render() {
      const borderStyle = path =>
        this.props.location.pathname === path
          ? { borderBottom: "2px solid black" }
          : {};

      const navTo = path => () => this.props.history.push(path);

      return (
        <div className="friends_header">
          <div className="header_title">Friends</div>
          <div className="make_show_buttons">
            <div
              className="make_show_button"
              style={borderStyle("/friend")}
              onClick={navTo("/friend")}
            >
              Friends
            </div>
            <div
              className="make_show_button"
              style={borderStyle("/friend/invite")}
              onClick={navTo("/friend/invite")}
            >
              Add Friends
            </div>
          </div>
        </div>
      );
    }
  }
);