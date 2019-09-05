import React from "react";
import { Link, withRouter } from "react-router-dom";
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
                <div>
                    <div className="content-genre-show-container">
                        <div>
                            <Link to={"/genres"}>Genres</Link>
                            >
                            <Link to={`/genres/${props.match.params.genre}`}>{props.match.params.genre}</Link>
                        </div>
                        <h2>{props.match.params.genre}</h2>
                        <p>new releases tagged "{props.match.params.genre}"</p>
                    </div>
                    <div className="genre-show-container">
                        <ul className="show-ul">
                        {data.booksByGenreShow.map(book => (
                            <li className="list-item col" key={book._id}>
                                <div className="tooltip">
                                    <img className="book-img show-img" src={book.coverPhoto} alt=""></img>
                                    <div className="book-info right">
                                        <div>{book.title}</div>
                                        <div>{book.description}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            )
        }}
    </Query>
)

export default withRouter(ShowGenre)