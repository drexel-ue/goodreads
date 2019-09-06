import React, { Component } from "react";
import "./BookShow.scss";

export default class MainCover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      showModal: false
    };

    this.src = this.props.src;
    this.toggle = this.toggle.bind(this);
  }

  toggle(field) {
    return event => {
      event.preventDefault();
      this.setState({ [field]: !this.state[field] });
    };
  }

  render() {
    const overlay = this.state.focused ? "overlay" : "hide";
    const modal = this.state.showModal ? "modal_background" : "hide";

    return (
      <div className="main_cover_container">
        <img
          onMouseEnter={this.toggle("focused")}
          className="main_cover"
          src={this.src}
          alt="book cover"
        />
        <div
          onMouseLeave={this.toggle("focused")}
          onClick={this.toggle("showModal")}
          className={overlay}
        >
          <i className="fas fa-search-plus" />
        </div>
        <div className={modal} onClick={this.toggle("showModal")}></div>
      </div>
    );
  }
}
