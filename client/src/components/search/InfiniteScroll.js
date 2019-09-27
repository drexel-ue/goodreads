import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InfiniteScroll.scss";

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.onLoadMore = this.onLoadMore.bind(this);
  }

  onLoadMore(event) {
    event.preventDefault();
    this.props.onLoadMore();
  }

  render() {
    return (
      <div className="infinite_scroll">
        {this.props.items.map((item, index) => {
          return <div key={index}>{index}</div>;
        })}
      </div>
    );
  }
}
