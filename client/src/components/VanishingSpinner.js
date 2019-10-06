import React, { Component } from "react";

export default class VanishingSpinner extends Component {
  constructor() {
    super();

    this.state = { vanish: false };

    this.vanish();
  }

  vanish() {
    setTimeout(() => this.setState({ vanish: true }), 1000);
  }

  render() {
    return this.state.vanish ? (
      <div />
    ) : (
      <i className="fas fa-spinner fa-pulse"></i>
    );
  }
}
