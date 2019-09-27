import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";
import Mutations from "../../graphql/mutations";
import "./BookShow.scss";

const { LEAVE_RATING } = Mutations;

export default class StarRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.highlight = this.highlight.bind(this);
    this.unhighlight = this.unhighlight.bind(this);
  }

  highlight(index) {
    return event => {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ index });
    };
  }

  unhighlight(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ index: -1 });
  }

  updateCache(client, { data }) {
    const book = data.leaveRating;
    // client.writeQuery({
    //   data: {
    //     [book._id]: book
    //   }
    // });
    this.setState()
  }

  render() {
    const highlit = index =>
      this.state.index >= index ? { color: "darkorange" } : {};

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

          return (
            <Mutation
              mutation={LEAVE_RATING}
              variables={{
                bookId: this.props.bookId,
                userId: _id,
                stars: this.state.index
              }}
              update={(client, data) => {
                this.updateCache(client, data);
              }}
            >
              {(leaveRating, { data }) => (
                <div className="stars">
                  <i
                    className="fas fa-star"
                    style={highlit(1)}
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      leaveRating();
                    }}
                    onMouseEnter={this.highlight(1)}
                    onMouseLeave={this.unhighlight}
                  ></i>
                  <i
                    className="fas fa-star"
                    style={highlit(2)}
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      leaveRating();
                    }}
                    onMouseEnter={this.highlight(2)}
                    onMouseLeave={this.unhighlight}
                  ></i>
                  <i
                    className="fas fa-star"
                    style={highlit(3)}
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      leaveRating();
                    }}
                    onMouseEnter={this.highlight(3)}
                    onMouseLeave={this.unhighlight}
                  ></i>
                  <i
                    className="fas fa-star"
                    style={highlit(4)}
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      leaveRating();
                    }}
                    onMouseEnter={this.highlight(4)}
                    onMouseLeave={this.unhighlight}
                  ></i>
                  <i
                    className="fas fa-star"
                    style={highlit(5)}
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      leaveRating();
                    }}
                    onMouseEnter={this.highlight(5)}
                    onMouseLeave={this.unhighlight}
                  ></i>
                </div>
              )}
            </Mutation>
          );
        }}
      </ApolloConsumer>
    );
  }
}
