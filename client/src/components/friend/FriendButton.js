import React, { Component } from "react";
import gql from "graphql-tag";
import { ApolloConsumer, Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import Queries from "../../graphql/queries";
import "./FriendButton.scss";
import VanishingSpinner from "../VanishingSpinner";

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

                console.log(myFriends.data, theirFriends.data);
                return <div className="friend_button">ADD</div>;
              }}
            </Composed>
          );
        }}
      </ApolloConsumer>
    );
  }
}
