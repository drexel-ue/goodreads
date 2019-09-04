import React from "react";
import { withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import gql from "graphql-tag";
const { CACHED_USER } = Queries;

const ProtectedHome = props => (
  <div>
    <h2>Hello</h2>

    <ApolloConsumer>
      {client => {
        console.log(
          client.readQuery({
            query: gql`
              query CachedUser {
                name
                _id
              }
            `
          })
        );
        // console.log(client);
        return (
          <Query query={CACHED_USER}>
            {({ loading, error, data }) => {
              // if (loading) console.log("loading", loading);
              // if (error) console.log("error", error);
              // if (data) console.log("data", data);
              return <div>Hi</div>;
            }}
          </Query>
        );
      }}
    </ApolloConsumer>
  </div>
);

export default withRouter(ProtectedHome);
