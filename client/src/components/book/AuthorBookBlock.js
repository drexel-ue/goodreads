import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./AuthorBookBlock.scss";

const { BOOKS_BY_AUTHOR } = Queries;

export default class AuthorBookBlock extends Component {
  constructor(props) {
    super(props);
    this.author = this.props.author;
    this.showing = this.props.showing;
  }

  render() {
    return (
      <Query query={BOOKS_BY_AUTHOR} variables={{ _id: this.author._id }}>
        {({ loading, error, data }) => {
          if (loading) return <div>loading...</div>;
          if (error) {
            console.log(error);
            return <div>error...</div>;
          }
          console.log(this.author.name, data);
          const others = data.booksByAuthor.filter(
            book => book._id !== this.showing
          );

          const books = others.slice(0, 5);

          return (
            <div className="author_book_block">
              <div className="header">{`BOOKS BY ${this.author.name.toUpperCase()}`}</div>
              <div className="books">
                {books.map(book => (
                  <img
                    key={book._id}
                    className="cover"
                    src={book.coverPhoto}
                    alt="cover"
                  />
                ))}
              </div>
              <div className="more_link">More...</div>
            </div>
          );
        }}
      </Query>
    );
  }
}
