import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
// import {withRouter}from'react-router-dom'
import "./BookShow.scss";

export default class ShelfButton extends Component {
  render() {
    return (
      <div className="shelf_button">
        <div className="want_to_read">Want To Read</div>
        <div className="dropdown_button">
          <i className="fas fa-caret-down"></i>
        </div>
      </div>
    );
  }
}
