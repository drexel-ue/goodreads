import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InfiniteScroll.scss";

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.timeout = undefined;
    this.debounce();
  }

  debounce() {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight * 0.6 &&
        !this.timeout
      ) {
        this.timeout = setTimeout(() => {
          this.timeout = undefined;
          this.props.onLoadMore();
        }, 2000);
      }
    });
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
        {this.props.items.length > 0 ? (
          <i className="fas fa-spinner fa-pulse"></i>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
