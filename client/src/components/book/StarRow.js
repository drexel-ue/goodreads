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
      index: 0,
      rated: false
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

  render() {
    const highlit = index =>
      this.state.index >= index ? { color: "darkorange" } : {};

    return (
      <div>
        <ApolloConsumer>
          {client => {
            const { _id } = client.readQuery({
              query: gql`
                query CachedUser {
                  _id
                }
              `
            });
            this._id = _id;
          }}
        </ApolloConsumer>
        {!this.state.rated ? (
          <Mutation
            mutation={LEAVE_RATING}
            variables={{
              bookId: this.props.bookId,
              userId: this._id,
              stars: this.state.index
            }}
            onCompleted={_ => this.setState({ rated: true })}
          >
            {(leaveRating, { data }) => (
              <div>
                <div className="rate_text">Rate this book</div>

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
              </div>
            )}
          </Mutation>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
