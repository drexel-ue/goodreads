import React from "react";
import { withRouter, Link } from "react-router-dom";

const BookItem = props => {
  if (props.data.booksByGenre) {
    if (props.data.booksByGenre.length > 0) {
      return (
        <div className="new-books-container">
          {props.data.booksByGenre.map((book, idx) => {
            const bookYear = book.publishDate.slice(0, 4);
            const bookMonth = book.publishDate.slice(6, 7);
            let count = 0;

            if (
              count < 5 &&
              props.year >= bookYear &&
              props.month + 1 >= bookMonth
            ) {
              count += 1;
              return (
                <div key={idx} className="new-book">
                  <div className="new-book-cover">
                    <Link to={`/book/${book._id}`}>
                      <img src={book.coverPhoto} alt="cover" />
                    </Link>
                  </div>
                  <div className="clear"></div>
                </div>
              );
            }
            return <div></div>;
          })}
        </div>
      );
    } else {
      return null;
    }
  }
};

export default withRouter(BookItem);
