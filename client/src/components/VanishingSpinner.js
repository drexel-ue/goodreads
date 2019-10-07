import React, { Component } from "react";

export default class VanishingSpinner extends Component {
  constructor(props) {
    super(props);

    this.state = { vanish: false };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentDidMount() {
    this.vanish();
    window.addEventListener(
      "scroll",
      () => {
        if (this.icon && this.icon.offsetTop < window.innerHeight) {
          console.log("onscreen");
          console.log(this.state.vanish, !this.timeout);
          if (this.state.vanish || !this.timeout) {
            console.log("resetting");
            this.setState({ vanish: false });
          }
        }
      },
      false
    );
  }

  vanish() {
    if (this.icon && this.icon.offsetTop < window.innerHeight) 
    this.timeout = setTimeout(() => {
      clearTimeout(this.timeout);
      this.setState({ vanish: true });
    }, 1000);
  }

  render() {
    return this.state.vanish ? (
      <div />
    ) : (
      <i
        ref={icon => {
          this.icon = icon;
        }}
        className="fas fa-spinner fa-pulse"
      ></i>
    );
  }
}
