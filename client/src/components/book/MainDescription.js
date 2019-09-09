import React, { Component } from "react";
import "./BookShow.scss";

export default class MainDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this.exdepand = this.exdepand.bind(this);
  }

  exdepand(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const expanderStyle = this.state.expanded ? {} : { height: "168px" };

    return (
      <div>
        <div className="description" style={expanderStyle}>
          {this.props.description}
        </div>
        <div className="description_expander" onClick={this.exdepand}>
          {this.state.expanded ? "(less)" : "...more"}
        </div>
      </div>
    );
  }
}
