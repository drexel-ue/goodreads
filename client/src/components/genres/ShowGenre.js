import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./ShowGenre.css"
const { BOOKS_BY_GENRE_SHOW } = Queries

const ShowGenre = props => (
    <Query query={BOOKS_BY_GENRE_SHOW} variables={{ genreString: props.match.params.genre }}>
        {({ loading, error, data }) => {
            
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return (
                <div className="genre-show-container">
                    <ul className="show-ul">
                    {data.booksByGenreShow.map(book => (
                        <li className="list-item" key={book._id}>
                            <div className="tooltip">
                                <img className="book-img" src={book.coverPhoto} alt=""></img>
                                <div className="book-info right">
                                    <div>{book.title}</div>
                                    <div>{book.description}</div>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            )
        }}
    </Query>
)

export default withRouter(ShowGenre)