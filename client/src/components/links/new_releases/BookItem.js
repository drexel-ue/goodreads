import React from "react";
import { withRouter, Link } from "react-router-dom";

const BookItem = props => {
  if (props.data.booksByGenre) {
    if (props.data.booksByGenre.length > 0) {
      return (
        <div className="new-books-container">
          {props.data.booksByGenre.map((book, idx) => {
            // const today = new Date();
            // const year = today.getFullYear();
            // const month = today.getMonth();
            // const bookYear = book.publishDate.slice(0, 4);
            // const bookMonth = book.publishDate.slice(6, 7
            // idx < 5 && year == bookYear && (month + 1) == bookMon
            if (idx < 5) {
              return (
                <div className="new-book">
                  <div className="new-book-cover">
                    <Link to={`/book/${book._id}`}>
                      <img src={book.coverPhoto} alt="cover" />
                    </Link>
                  </div>
                  <div className="clear"></div>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return (
        <div className="new-books-container">
          <div className="new-book">
            <div className="new-book-cover">
              <p>No new releases for this month.</p>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      );
    }
  }
};

export default withRouter(BookItem);
