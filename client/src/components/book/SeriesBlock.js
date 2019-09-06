import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./SeriesBlock.scss";

const { BOOKS_BY_SERIES } = Queries;

export default class SeriesBlock extends Component {
  constructor(props) {
    super(props);
    this.series = this.props.series;
    this.showing = this.props.showing;
  }

  render() {
    return (
      <Query query={BOOKS_BY_SERIES} variables={{ series: this.series }}>
        {({ loading, error, data }) => {
          if (loading) return <div>loading...</div>;
          if (error) {
            console.log(error);
            return <div>error...</div>;
          }
          console.log(this.series, data);
          const others = data.booksBySeries.filter(
            book => book._id !== this.showing
          );

          const books = others.slice(0, 5);

          return (
            <div className="series_block">
              <div className="header">OTHER BOOKS IN THIS SERIES</div>
              <div className="title_and_count">
                <div className="title">{this.series}</div>
                <div className="count">{`(${others.length + 1} books)`}</div>
              </div>
              <div className="books">
                {books.map(book => (
                  <img
                    key={book._id}
                    className="cover"
                    src={book.coverPhoto}
                    alt={book.title}
                  />
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
