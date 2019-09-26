import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
import "./Search.scss";
const { BOOK_SEARCH } = Queries;

export default withRouter(
  class Search extends Component {
    constructor(props) {
      super(props);

      this.state = {
        queryString: props.queryString || ""
      };
    }

    render() {
      return (
        <div className="search_component">
          <div className="main">main</div>
          <div className="side">side</div>
        </div>
      );
    }
  }
);
