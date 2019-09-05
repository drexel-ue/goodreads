import React from "react";
import { withRouter, Link } from "react-router-dom";

const BookItem = (props) => (
    <div className='new-book'>
        <div className='new-book-cover'>
            {props.data.booksByGenre.map((book, idx) => {
                // const today = new Date();
                // const year = today.getFullYear();
                // const month = today.getMonth();
                // const bookYear = book.publishDate.slice(0, 4);
                // const bookMonth = book.publishDate.slice(6, 7
                // idx < 5 && year == bookYear && (month + 1) == bookMon
                if (idx < 5) {
                    return (
                        <Link to='/'><img src={book.coverPhoto} alt='cover' /></Link>
                    )
                }
            })}
        </div>
    </div>
);

export default withRouter(BookItem);