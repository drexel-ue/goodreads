import React, { Component } from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import "./Make.scss";

const { QUERY_USERS } = Queries;

export default class Make extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: ""
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    event.preventDefault();
    this.setState({ queryString: event.currentTarget.value });
  }

  render() {
    return (
      <div className="make">
        <div className="main">
          <div className="search_row">
            <input
              type="text"
              className="search_bar"
              value={this.state.queryString}
              onChange={this.handleInput}
              placeholder="Search Your Friend List"
            />
            <div className="submit">Search</div>
          </div>
          <div className="results">
            <Query
              query={QUERY_USERS}
              variables={{ queryString: this.state.queryString }}
            >
              nslknslksnkls
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                const users = data.users;
                return (
                  <div>
                    {users.map(user => (
                      <div key={user._id}>{user.name}</div>
                    ))}
                  </div>
                );
              }}
            </Query>
          </div>
        </div>
        <div className="side">sjlsjlks</div>
      </div>
    );
  }
}
