import React, { Component } from "react";
import gql from "graphql-tag";
import { ApolloConsumer, Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import VanishingSpinner from "../VanishingSpinner";
import "./FriendButton.scss";

const { FRIEND_IDS } = Queries;
const { BE_UN_FRIEND } = Mutations;

export default class FriendButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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

          const Composed = adopt({
            myFriends: ({ render }) => (
              <Query
                query={FRIEND_IDS}
                variables={{ userId: _id }}
                fetchPolicy={"cache-and-network"}
              >
                {render}
              </Query>
            ),
            theirFriends: ({ render }) => (
              <Query
                query={FRIEND_IDS}
                variables={{ userId: this.props.theirId }}
                fetchPolicy={"cache-and-network"}
              >
                {render}
              </Query>
            )
          });

          return (
            <Composed>
              {({ myFriends, theirFriends }) => {
                if (myFriends.loading || theirFriends.loading)
                  return <VanishingSpinner />;

                const myFriendIds = myFriends.data.friendIds;
                const theirFriendIds = theirFriends.data.friendIds;

                const mutualFriends =
                  myFriendIds.includes(this.props.theirId) &&
                  theirFriendIds.includes(_id);
                const waitingOnThem =
                  myFriendIds.includes(this.props.theirId) &&
                  !theirFriendIds.includes(_id);
                const waitingOnMe =
                  !myFriendIds.includes(this.props.theirId) &&
                  theirFriendIds.includes(_id);
                const notFriendsAtAll =
                  !myFriendIds.includes(this.props.theirId) &&
                  !theirFriendIds.includes(_id);

                let text;
                let requestType;
                if (mutualFriends) {
                  text = "REMOVE";
                  requestType = "remove friend";
                }
                if (waitingOnMe) {
                  text = "ACCEPT";
                  requestType = "accept request";
                }
                if (waitingOnThem) {
                  text = "CANCEL";
                  requestType = "cancel request";
                }
                if (notFriendsAtAll) {
                  text = "ADD";
                  requestType = "send request";
                }

                return (
                  <Mutation
                    mutation={BE_UN_FRIEND}
                    variables={{
                      myId: _id,
                      theirId: this.props.theirId,
                      requestType
                    }}
                    onCompleted={() => {
                      if (this.props.onClick) this.props.onClick();
                      this.setState();
                    }}
                  >
                    {mutateFriendship => (
                      <div
                        className="friend_button"
                        onClick={() => mutateFriendship()}
                      >
                        {text}
                      </div>
                    )}
                  </Mutation>
                );
              }}
            </Composed>
          );
        }}
      </ApolloConsumer>
    );
  }
}
