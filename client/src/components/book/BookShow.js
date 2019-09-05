import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./BookShow.scss";

const { BOOK_BY_ID } = Queries;

export default withRouter(
  class BookShow extends Component {
    constructor(props) {
      super(props);

      this.state = { descriptionExpanded: false };
    }
    render() {
      return (
        <Query
          query={BOOK_BY_ID}
          variables={{ _id: this.props.match.params.bookId }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>loading...</div>;
            if (error) {
              console.log(error);
              return <div>error...</div>;
            }
            console.log("data", data);
            const { book } = data;

            const section1 = (
              <div className="section_1">
                <img
                  className="main_cover"
                  src={book.coverPhoto}
                  alt="book cover"
                />
                <div className="shelf_button">
                  <div className="want_to_read">Want To Read</div>
                  <div className="dropdown_button">
                    <i className="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="rate_text">Rate this book</div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <div className="preview">
                  <i className="fas fa-book-open"></i>
                  <div className="text">Preview</div>
                </div>
              </div>
            );

            const section2 = () => {
              const expanderStyle = this.state.descriptionExpanded
                ? {}
                : { height: "168px" };

              return (
                <div className="section_2">
                  <div className="title">{book.title}</div>
                  <div className="series">
                    <div>(</div>
                    <div className="link">{book.series}</div>
                    <div>)</div>
                  </div>
                  <div className="by">
                    <div className="by">by</div>
                    <div className="authors">
                      {book.authors.map((author, index) => {
                        if (
                          book.authors.length > 1 &&
                          index === book.authors.length - 1
                        ) {
                          return (
                            <div key={index} className="author">
                              {author.name}
                            </div>
                          );
                        } else {
                          return (
                            <div key={index} className="with_comma">
                              <div className="author">{author.name}</div>
                              <div>,</div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="rating_row">
                    <div className="stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="rating">{book.rating}</div>
                    <i className="fas fa-circle"></i>
                    <div className="details_button">
                      <i className="far fa-chart-bar"></i>
                      <div className="button_text">Rating details</div>
                    </div>
                    <i className="fas fa-circle"></i>
                    <div className="rating_count">280,209 ratings</div>
                    <i className="fas fa-circle"></i>
                    <div className="review_count">209,280 reviews</div>
                  </div>
                  <div className="description" style={expanderStyle}>
                    {book.description}{" "}
                  </div>
                  <div className="exdespander">
                    {this.state.descriptionExpanded ? "(less)" : "...more"}
                  </div>
                </div>
              );
            };

            return (
              <div className="book_show">
                {section1}
                {section2()}
                <div className="section_3"></div>
              </div>
            );
          }}
        </Query>
      );
    }
  }
);
