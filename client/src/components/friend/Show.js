import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import "./Show.scss";
import InfiniteScroll from "./InfiniteScroll";
import VanishingSpinner from "../VanishingSpinner";
import Requests from "./Requests";

const { FRIENDS } = Queries;

export default class Show extends Component {
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
      <div className="show">
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
          <div className="show_friends_results">
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
                    query={FRIENDS}
                    variables={{
                      userId: _id,
                      queryString: this.state.queryString,
                      offset: 0
                    }}
                  >
                    {({ loading, error, data, fetchMore }) => {
                      if (loading || error) return <VanishingSpinner />;

                      const { friends } = data;
                      return (
                        <InfiniteScroll
                          items={friends}
                          onLoadMore={() =>
                            fetchMore({
                              variables: {
                                queryString: this.state.queryString,
                                offset: friends.length,
                                limit: 30
                              },
                              updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                return Object.assign({}, prev, {
                                  friends: [
                                    ...prev.friends,
                                    ...fetchMoreResult.friends
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
