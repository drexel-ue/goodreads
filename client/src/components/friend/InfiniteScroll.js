import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./InfiniteScroll.scss";
import VanishingSpinner from "../VanishingSpinner";

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.timeout = undefined;
    this.debounce = this.debounce.bind(this);
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
      this.timeout = setTimeout(() => {
        this.timeout = undefined;
        this.props.onLoadMore();
      }, 2000);
    }
  }

  render() {
    return (
      <div className="infinite_scroll">
        {this.props.items.map((friend, index) => {
          let bookCount = 0;
          friend.shelves.forEach(shelf => (bookCount += shelf.bookIds.length));
          const friendCount = friend.friendIds.length;
          const book = friend.currentlyReading;

          return (
            <div key={index}>
              <div className="friend_search_result">
                <div className="section_1">
                  <img
                    className="profile"
                    alt="profile"
                    src={friend.profilePhoto}
                  />
                  <div className="info">
                    <Link className="name" to="#">
                      {friend.name}
                    </Link>
                    <div className="stats_row">
                      <div className="book_count">{`${bookCount} books | `}</div>
                      <div className="friend_count">{`${friendCount} friends`}</div>
                    </div>
                  </div>
                </div>
                {friend.currentlyReading ? (
                  <div className="section_2">
                    <img className="cover" alt="cover" src={book.coverPhoto} />
                    <div className="info">
                      <div className="currently_reading">
                        Currently Reading:
                      </div>
                      <div className="title">
                        <Link to={`/book/${book._id}`}>{book.title}</Link>
                      </div>
                      <div className="page">{`"On page ${friend.currentPage}"`}</div>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
          );
        })}
        <VanishingSpinner count={this.props.items.length} />
      </div>
    );
  }
}
