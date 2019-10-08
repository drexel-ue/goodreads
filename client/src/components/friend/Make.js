import React, { Component } from "react";
import gql from "graphql-tag";
import Queries from "../../graphql/queries";
import { Query, ApolloConsumer } from "react-apollo";
import InfiniteScroll from "./InfiniteScroll";
import VanishingSpinner from "../VanishingSpinner";
import "./Make.scss";
import Requests from "./Requests";

const { NON_FRIENDS } = Queries;

export default class Make extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: ""
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    event.preventDefault();
    this.setState({ queryString: event.currentTarget.value });
  }

  render() {
    return (
      <div className="make">
        <div className="main">
          <div className="search_row">
            <input
              type="text"
              className="search_bar"
              value={this.state.queryString}
              onChange={this.handleInput}
              placeholder="Search Your Friend List"
            />
            <div className="submit">Search</div>
          </div>
          <div className="results">
            <ApolloConsumer>
              {client => {
                const { _id } = client.readQuery({
                  query: gql`
                    query CachedUser {
                      _id
                    }
                  `
                });

                return (
                  <Query
                    query={NON_FRIENDS}
                    variables={{
                      userId: _id,
                      queryString: this.state.queryString,
                      offset: 0
                    }}
                  >
                    {({ loading, error, data, fetchMore }) => {
                      // debugger;
                      if (loading || error) return <VanishingSpinner />;
                      const { nonFriends } = data;
                      return (
                        <InfiniteScroll
                          items={nonFriends}
                          onLoadMore={() =>
                            fetchMore({
                              variables: {
                                queryString: this.state.queryString,
                                offset: nonFriends.length,
                                limit: 30
                              },
                              updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                return Object.assign({}, prev, {
                                  nonFriends: [
                                    ...prev.nonFriends,
                                    ...fetchMoreResult.nonFriends
                                  ]
                                });
                              }
                            })
                          }
                        />
                      );
                    }}
                  </Query>
                );
              }}
            </ApolloConsumer>
          </div>
        </div>
        <div className="side">
          <Requests />
        </div>
      </div>
    );
  }
}
