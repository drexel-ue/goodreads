import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InfiniteScroll.scss";

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.timeout = undefined;
    this.debounce();

    this.onLoadMore = this.onLoadMore.bind(this);
  }

  debounce() {
    const that = this;
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight * 0.6 &&
        !that.timeout
      ) {
        that.timeout = setTimeout(() => {
          this.timeout = undefined;
          that.props.onLoadMore();
        }, 2000);
      }
    });
  }

  onLoadMore(event) {
    event.preventDefault();
    this.props.onLoadMore();
  }

  render() {
    return (
      <div className="infinite_scroll">
        {this.props.items.map((book, index) => {
          return (
            <div key={index}>
              <Link key={index} to={`/book/${book._id}`}>
                <div className="search_bar_result">
                  <img className="cover" alt="cover" src={book.coverPhoto} />
                  <div className="info">
                    <div className="title">{book.title}</div>
                    <div className="author">{`by ${book.authors[0].name}`}</div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
