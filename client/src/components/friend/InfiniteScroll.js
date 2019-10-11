import React, { Component } from "react";
import { Link } from "react-router-dom";
import FriendButton from "./FriendButton";

import "./InfiniteScroll.scss";
import lazyLoad from "../../util/lazy_loader";

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.state = { spin: false };

    this.timeout = undefined;
    this.debounce = this.debounce.bind(this);

    this.listen();
  }

  componentDidMount() {
    const targets = document.querySelectorAll("img[data_lazy]");
    targets.forEach(target => lazyLoad(target));
  }

  componentDidUpdate() {
    const targets = document.querySelectorAll("img[data_lazy]");
    targets.forEach(target => lazyLoad(target));
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
        this.setState({ spin: true }, () => {
          this.props.onLoadMore().then(() => this.setState({ spin: false }));
        });
      }, 500);
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
                    data_lazy={friend.profilePhoto}
                  />
                  <div className="info">
                    <Link className="name" to="#">
                      {friend.name}
                    </Link>
                    <div className="stats_row">
                      <div className="book_count">{`${bookCount} books | `}</div>
                      <div className="friend_count">{`${friendCount} friends`}</div>
                    </div>
                    <FriendButton
                      onClick={this.props.onLoadMore}
                      theirId={friend._id}
                    />
                  </div>
                </div>
                {friend.currentlyReading &&
                this.props.location !== "requests" ? (
                  <div className="section_2">
                    <img
                      className="cover"
                      alt="cover"
                      data_lazy={book.coverPhoto}
                    />
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
        {this.state.spin ? (
          <i className="fas fa-spinner fa-pulse"></i>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
