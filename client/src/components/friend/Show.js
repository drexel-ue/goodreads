import React, { Component } from "react";
import "./Show.scss";

export default class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: ""
    };

    this.handleInput=this.handleInput.bind(this)
  }

  handleInput(event) {
    event.preventDefault();
    this.setState({ queryString: event.currentTarget.value });
  }

  render() {
    return (
      <div className="show">
        <div className="main">
          <div className="search_row">
            <input
              type="text"
              className="search_bar"
              value={this.state.queryString}
              onChange={this.handleInput}
              placeholder="Search Your Friend List"
            />
            <div className="submit">Search</div>
          </div>
        </div>
        <div className="side">sjlsjlks</div>
      </div>
    );
  }
}
