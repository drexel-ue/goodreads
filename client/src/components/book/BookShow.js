import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./BookShow.scss";

const { BOOK_BY_ID } = Queries;

export default withRouter(({ match, history }) => {
  return (
    <Query query={BOOK_BY_ID} variables={{ _id: match.params.bookId }}>
      {({ loading, error, data }) => {
        if (loading) return <div>loading...</div>;
        if (error) {
          console.log(error);
          return <div>error...</div>;
        }
        console.log("data", data);
        return (
          <div className="book_show">
            <div className="section_1"></div>
            <div className="section_2"></div>
            <div className="section_3"></div>
          </div>
        );
      }}
    </Query>
  );
});
