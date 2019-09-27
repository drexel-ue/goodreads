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

      this.queryString = "";

      this.holdQueryString = this.holdQueryString.bind(this);
      this.commenceSearch = this.commenceSearch.bind(this);
    }

    holdQueryString(event) {
      event.preventDefault();
      this.queryString = event.currentTarget.value;
    }

    commenceSearch(event) {
      event.preventDefault();
      this.setState({ queryString: this.queryString });
    }

    render() {
      return (
        <div className="search_component">
          <div className="main">
            <div className="header">Search</div>
            <div className="search_block">
              <form className="input_row" onSubmit={this.commenceSearch}>
                <input
                  type="text"
                  className="search_bar"
                  placeholder="Search by Book Title, Author, or ISBN"
                  onChange={this.holdQueryString}
                />
                <div className="search_button" onClick={this.commenceSearch}>
                  Search
                </div>
              </form>
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
            {this.state.queryString ? (
              <div className="page">{`Results for "${this.state.queryString}"`}</div>
            ) : (
              <div />
            )}
            <Query
              query={BOOK_SEARCH}
              variables={{
                queryString: this.state.queryString,
                offset: 0,
                limit: 30
              }}
            >
              {({ loading, error, data, fetchMore }) => {
                if (loading || error)
                  return <i className="fas fa-spinner fa-pulse"></i>;
                console.log("data", data);
                const { bookSearch } = data;
                return (
                  <InfiniteScroll
                    items={bookSearch}
                    onLoadMore={() =>
                      fetchMore({
                        variables: {
                          queryString: this.state.queryString,
                          offset: bookSearch.length,
                          limit: 30
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            bookSearch: [
                              ...prev.bookSearch,
                              ...fetchMoreResult.bookSearch
                            ]
                          });
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
