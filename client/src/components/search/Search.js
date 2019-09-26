import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
import InfiniteScroll from "./InfiniteScroll";
import "./Search.scss";
const { BOOK_SEARCH } = Queries;

export default withRouter(
  class Search extends Component {
    constructor(props) {
      super(props);

      this.state = {
        queryString: this.props.location.state
          ? this.props.location.state.queryString
          : ""
      };
    }

    render() {
      return (
        <div className="search_component">
          <div className="main">
            <div className="title">Search</div>
            <div className="search_block">
              <div className="input_row">
                <input
                  type="text"
                  className="search_bar"
                  placeholder="Search by Book Title, Author, or ISBN"
                />
                <div className="search_button">Search</div>
              </div>
              <div className="radio_row">
                <div className="duo">
                  <input type="radio" />
                  <div className="label">all</div>
                </div>
                <div className="duo">
                  <input type="radio" />
                  <div className="label">title</div>
                </div>
                <div className="duo">
                  <input type="radio" />
                  <div className="label">author</div>
                </div>
                <div className="duo">
                  <input type="radio" />
                  <div className="label">genre</div>
                </div>
              </div>
            </div>
            <Query
              query={BOOK_SEARCH}
              variables={{
                queryString: this.state.queryString,
                offset: 0
              }}
            >
              {({ loading, error, data, fetchMore }) => {
                if (loading || error)
                  return <i className="fas fa-spinner fa-pulse"></i>;
                const { bookSearch } = data;
                return (
                  <InfiniteScroll
                    items={bookSearch}
                    onLoadMore={() =>
                      fetchMore({
                        variables: {
                          queryString: this.state.queryString,
                          offset: bookSearch.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          console.log("prev", prev);
                          console.log("fetchMoreResult", fetchMoreResult);
                          return [1, 2, 3];
                          // if (!fetchMoreResult) return prev;
                          // return Object.assign({}, prev, {
                          //   feed: [...prev.feed, ...fetchMoreResult.feed]
                          // });
                        }
                      })
                    }
                  ></InfiniteScroll>
                );
              }}
            </Query>
          </div>
          <div className="side"></div>
        </div>
      );
    }
  }
);
