import React, { Component } from "react";
import "./BookShow.scss";

export default class MainCover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };

    this.src = this.props.src;
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter(event) {
    event.preventDefault();
    this.setState({ focused: true });
  }

  mouseLeave(event) {
    event.preventDefault();
    this.setState({ focused: false });
  }

  render() {
    const display = this.state.focused ? "overlay" : "hide";

    return (
      <div className="main_cover_container">
        <img
          onMouseEnter={this.mouseEnter}
          className="main_cover"
          src={this.src}
          alt="book cover"
        />
        <div onMouseLeave={this.mouseLeave} className={display}></div>
      </div>
    );
  }
}
