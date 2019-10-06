import React, { Component } from "react";

export default class VanishingSpinner extends Component {
  constructor(props) {
    super(props);

    this.state = { vanish: false };
  }

  componentWillReceiveProps() {
    this.setState({ vanish: false });
    this.vanish();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentDidMount() {
    this.vanish();
  }

  vanish() {
    this.timeout = setTimeout(() => {
      this.setState({ vanish: true });
    }, 1000);
  }

  render() {
    return this.state.vanish ? (
      <div />
    ) : (
      <i className="fas fa-spinner fa-pulse"></i>
    );
  }
}
