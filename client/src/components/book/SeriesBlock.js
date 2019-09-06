import React from "react";
// import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./BookShow.scss";

const { BOOKS_BY_SERIES } = Queries;

export default series => {
  return (
    <Query query={BOOKS_BY_SERIES}>
      {({ loading, error, data }) => {
        if (loading) return <div>loading...</div>;
        if (error) {
          console.log(error);
          return <div>error...</div>;
        }
        console.log(series, data);

        return <div>{series}</div>;
      }}
    </Query>
  );
};
