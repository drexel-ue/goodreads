import React, { Component } from "react";
import { Link } from "react-router-dom";
import './InfiniteScroll.scss'

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="infinite_scroll">
          <div className="page">Page yadda yadda of yadda yadda</div>
        {this.props.items.map((item, index) => {
          return <div key={index}>{index}</div>;
        })}
      </div>
    );
  }
}
