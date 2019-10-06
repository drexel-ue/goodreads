import React, { Component } from "react";

export default class VanishingSpinner extends Component {
  constructor(props) {
    super(props);

    this.state = { vanish: false };

    this.vanish();
  }

  componentWillReceiveProps() {
    this.setState({ vanish: false });
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
