import React, { Component } from "react";
import gql from "graphql-tag";
import { ApolloConsumer, Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import Queries from "../../graphql/queries";
import VanishingSpinner from "../VanishingSpinner";
import "./FriendButton.scss";

const { FRIEND_IDS } = Queries;

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
              <Query query={FRIEND_IDS} variables={{ userId: _id }}>
                {render}
              </Query>
            ),
            theirFriends: ({ render }) => (
              <Query
                query={FRIEND_IDS}
                variables={{ userId: this.props.theirId }}
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
                if (mutualFriends) text = "REMOVE";
                if (waitingOnMe) text = "ACCEPT";
                if (waitingOnThem) text = "CANCEL";
                if (notFriendsAtAll) text = "ADD";

                return <div className="friend_button">{text}</div>;
              }}
            </Composed>
          );
        }}
      </ApolloConsumer>
    );
  }
}
