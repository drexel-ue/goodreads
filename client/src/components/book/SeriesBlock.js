import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./BookShow.scss";

const { BOOKS_BY_SERIES } = Queries;

export default class SeriesBlock extends Component {
  render() {
    return (
      <Query query={BOOKS_BY_SERIES} variables={{ series: this.props.series }}>
        {({ loading, error, data }) => {
          if (loading) return <div>loading...</div>;
          if (error) {
            console.log(error);
            return <div>error...</div>;
          }
          console.log(this.props.series, data);

          return <div>{this.props.series}</div>;
        }}
      </Query>
    );
  }
}
