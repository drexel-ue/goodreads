import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InfiniteScroll.scss";

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.timeout = undefined;
    this.listen();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.debounce, false);
  }

  listen() {
    window.addEventListener("scroll", this.debounce, false);
  }

  debounce() {
    if (
      window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight * 0.6 &&
      !this.timeout
    ) {
      const that = this;
      that.timeout = setTimeout(() => {
        that.timeout = undefined;
        that.props.onLoadMore();
      }, 2000);
    }
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
                    <div className="author_row">
                      <div className="by">by</div>
                      <div className="authors">
                        {book.authors.map((author, index) => {
                          if (
                            book.authors.length > 1 &&
                            index === book.authors.length - 1
                          ) {
                            return (
                              <div key={index} className="author">
                                {author.name}
                              </div>
                            );
                          } else {
                            return (
                              <div key={index} className="with_comma">
                                <div className="author">{author.name}</div>
                                <div>,</div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
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
