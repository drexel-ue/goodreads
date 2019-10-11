import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, ApolloConsumer, Query } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import "../book/BookShow.scss";
import "../book/StarRow.scss";
import { withRouter } from "react-router-dom";
import RatedRow from "../book/RatedRow"

const { RATED_BY_USER, FETCH_RATING_BY_USER_AND_BOOK_ID } = Queries;
const { LEAVE_RATING } = Mutations;

export default withRouter(
  class ReviewRating extends Component {
    constructor(props) {
      super(props);

      this.state = {
        index: 0
      };

      this.highlight = this.highlight.bind(this);
      this.unhighlight = this.unhighlight.bind(this);
      this.toReview = this.toReview.bind(this);
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

    toReview(event) {
      event.preventDefault();
      this.props.history.push(`/reviews/${this.props.bookId}`);
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
              return (
                <Query
                  query={RATED_BY_USER}
                  variables={{ bookId: this.props.bookId, userId: _id }}
                >
                  {({ data, refetch }) => {
                    if (data && !data.ratedByUser[0]) {
                        // debugger
                      return (
                        <Mutation
                          mutation={LEAVE_RATING}
                          variables={{
                            bookId: this.props.bookId,
                            userId: _id,
                            stars: this.state.index
                          }}
                          onCompleted={_ => refetch()}
                        >
                          {leaveRating => (
                            <div className="star_row_wrapper">
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
                      );
                    } else if (data && data.ratedByUser[0]) {
                        // debugger
                        return (
                        <Query 
                            query={FETCH_RATING_BY_USER_AND_BOOK_ID}
                            variables={{ bookId: this.props.bookId, userId: _id }}
                            >
                                {({ loading, error, data }) => {
                                    if (loading) return <p>Loading...</p>;
                                    // debugger
                                    if (error) {
                                        return <p>Error</p>;
                                    }
                                    return (
                                        <RatedRow rating={data.ratingByUserAndBookId.stars}></RatedRow>
                                    // <div></div>
                                    )
                            }}
                        </Query>
                        )
                    } else {
                        return (
                            <div></div>
                        )
                    }
                  }}
                </Query>
              );
            }}
          </ApolloConsumer>
        </div>
      );
    }
  }
);
