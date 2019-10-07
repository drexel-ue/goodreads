import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import gql from "graphql-tag";
import VanishingSpinner from "../VanishingSpinner";
import { Link } from "react-router-dom";
import FriendButton from "./FriendButton";
import "./Requests.scss";

const { MAYBE_FRIENDS, FRIEND_IDS } = Queries;

export default class Requests extends Component {
  render() {
    return (
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
            <Query query={FRIEND_IDS} variables={{ userId: _id }}>
              {({ data, loading, error }) => {
                if (loading || error) return <VanishingSpinner />;

                const { friendIds } = data;

                return (
                  <Query query={MAYBE_FRIENDS} variables={{ userId: _id }}>
                    {({ loading, error, data, refetch }) => {
                      if (loading || error) return <VanishingSpinner />;

                      const { maybeFriends } = data;
                      const requests = maybeFriends.filter(
                        maybe =>
                          (maybe.friendIds.includes(_id) &&
                            !friendIds.includes(maybe._id)) ||
                          (!maybe.friendIds.includes(_id) &&
                            friendIds.includes(maybe._id))
                      );

                      return (
                        <div>
                          {requests.map((friend, index) => {
                            let bookCount = 0;
                            friend.shelves.forEach(
                              shelf => (bookCount += shelf.bookIds.length)
                            );
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
                                      <FriendButton
                                        onClick={refetch}
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
                                        src={book.coverPhoto}
                                      />
                                      <div className="info">
                                        <div className="currently_reading">
                                          Currently Reading:
                                        </div>
                                        <div className="title">
                                          <Link to={`/book/${book._id}`}>
                                            {book.title}
                                          </Link>
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
                          <VanishingSpinner />
                        </div>
                      );
                    }}
                  </Query>
                );
              }}
            </Query>
          );
        }}
      </ApolloConsumer>
    );
  }
}
