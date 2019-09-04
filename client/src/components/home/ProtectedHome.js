import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { CACHED_USER } = Queries;

const ProtectedHome = props => (
  <div>
    <h2>Hello</h2>

    <Query query={CACHED_USER}>
      {({ loading, error, data }) => {
        if (loading) console.log("loading", loading);
        if (error) console.log("error", error);
        if (data) console.log("data", data);
        return <div>Hi</div>;
      }}
    </Query>
  </div>
);

export default withRouter(ProtectedHome);
