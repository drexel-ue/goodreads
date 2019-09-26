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
          <div className="main">
            <div className="title">Search</div>
            <div className="search_block">
              <div className="input_row">
                <input
                  type="text"
                  className="search_bar"
                  placeholder="Search by Book Title, Author, or ISBN"
                />
                <div className="search_button">Search</div>
              </div>
            </div>
          </div>
          <div className="side"></div>
        </div>
      );
    }
  }
);
