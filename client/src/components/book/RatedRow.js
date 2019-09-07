import React, { Component } from "react";
import "./BookShow";

export default class RatedRow extends Component {
  render() {
    const lit = index =>
      index >= this.props.rating ? { color: "darkorgange" } : {};

    return (
      <div className="stars">
        <i className="fas fa-star" style={lit(1)}></i>
        <i className="fas fa-star" style={lit(2)}></i>
        <i className="fas fa-star" style={lit(3)}></i>
        <i className="fas fa-star" style={lit(4)}></i>
        <i className="fas fa-star" style={lit(5)}></i>
      </div>
    );
  }
}
