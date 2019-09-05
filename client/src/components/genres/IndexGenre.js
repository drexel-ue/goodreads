import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./IndexGenre.css"
const { BOOKS_BY_GENRE } = Queries

const IndexGenre = props => {
    return (
        <div className="index-genre-container">
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Science fiction"}}>

            {({ loading, error, data }) => {
                // debugger
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <div className="genre-container">
                        <div className="genre-header">Science Fiction</div>
                        <ul className="index-ul">
                            {data.booksByGenre.map(book => (
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
                        <div className="genre-footer">More science fiction...</div>
                    </div>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Suspense"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <div className="genre-container">
                        <div className="genre-header">Suspense</div>
                        <ul className="index-ul">
                            {data.booksByGenre.map(book => (
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
                        <div className="genre-footer">More suspense...</div>
                    </div>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Fantasy"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <div className="genre-container">
                        <div className="genre-header">Fantasy</div>
                        <ul className="index-ul">
                            {data.booksByGenre.map(book => (
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
                        <div className="genre-footer">More fantasy...</div>
                    </div>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "History"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <div className="genre-container">
                        <div className="genre-header">History</div>
                        <ul className="index-ul">
                            {data.booksByGenre.map(book => (
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
                        <div className="genre-footer">More history...</div>
                    </div>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Paranormal romance"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <div className="genre-container">
                        <div className="genre-header">Paranormal Romance</div>
                        <ul className="index-ul">
                            {data.booksByGenre.map(book => (
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
                        <div className="genre-footer">More paranormal romance...</div>
                    </div>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Chick lit"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <div className="genre-container">
                        <div className="genre-header">Chick Lit</div>
                        <ul className="index-ul">
                            {data.booksByGenre.map(book => (
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
                        <div className="genre-footer">More chick lit...</div>
                    </div>
            )
        }
    }
        </Query>
        </div>
    )
}

export default withRouter(IndexGenre)