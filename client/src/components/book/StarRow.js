import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import "./BookShow.scss";

export default class StarRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.highlight = this.highlight.bind(this);
    this.unhighlight = this.unhighlight.bind(this);
  }

  highlight(index) {
    return event => {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ index });
    };
  }

  unhighlight(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ index: -1 });
  }

  render() {
    const highlit = index =>
      this.state.index >= index ? { color: "darkorange" } : {};

    return (
      <div className="stars">
        <i
          className="fas fa-star"
          style={highlit(1)}
          onMouseEnter={this.highlight(1)}
          onMouseLeave={this.unhighlight}
        ></i>
        <i
          className="fas fa-star"
          style={highlit(2)}
          onMouseEnter={this.highlight(2)}
          onMouseLeave={this.unhighlight}
        ></i>
        <i
          className="fas fa-star"
          style={highlit(3)}
          onMouseEnter={this.highlight(3)}
          onMouseLeave={this.unhighlight}
        ></i>
        <i
          className="fas fa-star"
          style={highlit(4)}
          onMouseEnter={this.highlight(4)}
          onMouseLeave={this.unhighlight}
        ></i>
        <i
          className="fas fa-star"
          style={highlit(5)}
          onMouseEnter={this.highlight(5)}
          onMouseLeave={this.unhighlight}
        ></i>
      </div>
    );
  }
}
