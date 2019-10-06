import React, { Component } from "react";
import gql from "graphql-tag";
import { ApolloConsumer, Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import "./FriendButton.scss";

export default class FriendButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    //   const Composed = adopt({
    //     myFriends:({render})=><query
    // });
    // return (
    //   <ApolloConsumer>
    //     {client => {
    //       const { _id } = client.readQuery({
    //         query: gql`
    //           query CachedUser {
    //             _id
    //           }
    //         `
    //       });
    //     }}
    //   </ApolloConsumer>
    // );
    return <div></div>;
  }
}

{
  /* <div className="friend_button">ADD</div>; */
}
