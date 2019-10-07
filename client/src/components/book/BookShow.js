import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import SeriesBlock from "./SeriesBlock";
import AuthorBookBlock from "./AuthorBookBlock";
import MainCover from "./MainCover";
import ShelfButton from "./ShelfButton";
import StarRow from "./StarRow";
import RatedRow from "./RatedRow";
import MainDescription from "./MainDescription";
import StoresDropdown from "./StoresDropdown";
import FullBookDetail from "./FullBookDetail";
import BookReviews from "../reviews/BookReview";
import "./BookShow.scss";
import BookReview from "../reviews/BookReview";

const { BOOK_BY_ID } = Queries;

export default withRouter(
  class BookShow extends Component {
    constructor(props) {
      super(props);

      this.state = {
        detailsExpanded: false
      };
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
              return <div>error...</div>;
            }
            const { book } = data;

            const section1 = (
              <div className="section_1">
                <MainCover src={book.coverPhoto} />
                <ShelfButton _id={book._id} />
                <StarRow bookId={book._id} />
                <div className="preview">
                  <i className="fas fa-book-open"></i>
                  <div className="text">Preview</div>
                </div>
              </div>
            );

            const section2 = () => {
              const publishDate = new Date(book.publishDate);
              const rating = Math.round(book.rating);

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
                    <RatedRow rating={rating} />
                    <div className="rating">{Math.round(rating)}</div>
                    <i className="fas fa-circle"></i>
                    <div className="details_button">
                      <i className="far fa-chart-bar"></i>
                      <div className="button_text">Rating details</div>
                    </div>
                    <i className="fas fa-circle"></i>
                    <div className="rating_count">{`${book.ratingIds.length} ratings`}</div>
                    <i className="fas fa-circle"></i>
                    <div className="review_count">209,280 reviews</div>
                  </div>
                  <MainDescription description={book.description} />
                  <div className="purchase_block">
                    <div className="get_a_copy">Get a copy</div>
                    <div className="purchase_options">
                      <div className="option">Amazon $9.99</div>
                      <div className="option">Kindle</div>
                      <StoresDropdown />
                      <div className="option">Libraries</div>
                    </div>
                  </div>
                  <div className="less_details">
                    {`${book.coverType}, ${book.pages} pages`}
                    <br />
                    {`Published ${publishDate.toDateString()} by ${
                      book.publisher
                    }`}
                  </div>
                  <FullBookDetail book={book} />
                  <Link
                    className="write-review-link"
                    to={`/reviews/${book._id}`}
                  >
                    Write a review
                  </Link>
                  <BookReview bookId={book._id} />
                </div>
              );
            };

            const section3 = () => {
              const placeBorder = (index, total) =>
                index === total - 1
                  ? {}
                  : { borderBottom: "1px solid #d8d8d8" };

              const author = book.authors[0];

              return (
                <div className="section_3">
                  <div className="genre_block">
                    <div className="header">GENRES</div>
                    <div className="genres">
                      {book.genres.map((genre, index) => (
                        <div
                          key={index}
                          className="genre"
                          style={placeBorder(index, book.genres.length)}
                        >
                          {genre}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="author_block">
                    <div className="header">{`About ${author.name}`}</div>
                    <div className="top">
                      <img
                        className="photo"
                        src={author.profilePhoto}
                        alt="headshot"
                      />
                      <div className="info">
                        <div className="name">{author.name}</div>
                        <div className="follower_count">{`${author.followerIds.length} followers`}</div>
                        <div className="option">{`Follow ${author.name}`}</div>
                      </div>
                    </div>
                    <div className="bottom">{author.bio}</div>
                  </div>

                  {book.series ? (
                    <SeriesBlock series={book.series} showing={book._id} />
                  ) : (
                    <div></div>
                  )}

                  {author.bookIds.length > 1 ? (
                    <AuthorBookBlock author={author} showing={book._id} />
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            };

            return (
              <div className="book_show">
                {section1}
                {section2()}
                {section3()}
              </div>
            );
          }}
        </Query>
      );
    }
  }
);
