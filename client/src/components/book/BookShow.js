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

        return (
          <div className="book_show">
            {section1}
            <div className="section_2">
              <div className="title">{book.title}</div>
            </div>
            <div className="section_3"></div>
          </div>
        );
      }}
    </Query>
  );
});
