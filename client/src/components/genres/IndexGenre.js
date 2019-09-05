import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./IndexGenre.css"
const { BOOKS_BY_GENRE } = Queries

const IndexGenre = props => {
    return (
        <div className="content-index-genre-container">
            <div className="index-genre-container">
            <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Science-fiction"}}>

                {({ loading, error, data }) => {
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
                            <Link to={"/genres/Science-fiction"} className="genre-footer">More science fiction...</Link>
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
            <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Paranormal-romance"}}>

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
            <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Chick-lit"}}>

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
            <div className="genre-side-bar-container">
                <div>
                    <h3>Browse</h3>
                    <div className="side-bar-links-container">
                        <Link to={"/genres/Science-fiction"} className="side-bar-link">Science-fiction</Link>
                        <Link to={"/genres/Comic-book"} className="side-bar-link">Comic-book</Link>
                        <Link to={"/genres/Diary"} className="side-bar-link">Diary</Link>
                        <Link to={"/genres/Coming-of-age"} className="side-bar-link">Coming-of-age</Link>
                        <Link to={"/genres/Dictionary"} className="side-bar-link">Dictionary</Link>
                        <Link to={"/genres/Crime"} className="side-bar-link">Crime</Link>
                        <Link to={"/genres/Encyclopedia"} className="side-bar-link">Encyclopedia</Link>
                        <Link to={"/genres/Drama"} className="side-bar-link">Drama</Link>
                        <Link to={"/genres/Guide"} className="side-bar-link">Guide</Link>
                        <Link to={"/genres/Fairytale"} className="side-bar-link">Fairytale</Link>
                        <Link to={"/genres/Health"} className="side-bar-link">Health</Link>
                        <Link to={"/genres/Fantasy"} className="side-bar-link">Fantasy</Link>
                        <Link to={"/genres/History"} className="side-bar-link">History</Link>
                        <Link to={"/genres/Graphic-novel"} className="side-bar-link">Graphic-novel</Link>
                        <Link to={"/genres/Journal"} className="side-bar-link">Journal</Link>
                        <Link to={"/genres/Historical-fiction"} className="side-bar-link">Historical-fiction</Link>
                        <Link to={"/genres/Math"} className="side-bar-link">Math</Link>
                        <Link to={"/genres/Horror"} className="side-bar-link">Horror</Link>
                        <Link to={"/genres/Memoir"} className="side-bar-link">Memoir</Link>
                        <Link to={"/genres/Mystery"} className="side-bar-link">Mystery</Link>
                        <Link to={"/genres/Prayer"} className="side-bar-link">Prayer</Link>
                        <Link to={"/genres/Paranormal-romance"} className="side-bar-link">Paranormal-romance</Link>
                        <Link to={"/genres/Picture-book"} className="side-bar-link">Picture-book</Link>
                        <Link to={"/genres/Textbook"} className="side-bar-link">Textbook</Link>
                        <Link to={"/genres/Poetry"} className="side-bar-link">Poetry</Link>
                        <Link to={"/genres/Review"} className="side-bar-link">Review</Link>
                        <Link to={"/genres/Political-thriller"} className="side-bar-link">Political-thriller</Link>
                        <Link to={"/genres/Science"} className="side-bar-link">Science</Link>
                        <Link to={"/genres/Romance"} className="side-bar-link">Romance</Link>
                        <Link to={"/genres/Self-help"} className="side-bar-link">Self-help</Link>
                        <Link to={"/genres/Satire"} className="side-bar-link">Satire</Link>
                        <Link to={"/genres/Travel"} className="side-bar-link">Travel</Link>
                        <Link to={"/genres/Science-fiction"} className="side-bar-link">Science-fiction</Link>
                        <Link to={"/genres/True-crime"} className="side-bar-link">True-crime</Link>
                        <Link to={"/genres/Short-story"} className="side-bar-link">Short-story</Link>
                        <Link to={"/genres/Suspense"} className="side-bar-link">Suspense</Link>
                        <Link to={"/genres/Thriller"} className="side-bar-link">Thriller</Link>
                        <Link to={"/genres/Young-adult"} className="side-bar-link">Young-adult</Link>
                        <Link to={"/genres/Art"} className="side-bar-link">Art</Link>
                        <Link to={"/genres/Alternate-history"} className="side-bar-link">Alternate-history</Link>
                        <Link to={"/genres/Autobiography"} className="side-bar-link">Autobiography</Link>
                        <Link to={"/genres/Anthology"} className="side-bar-link">Anthology</Link>
                        <Link to={"/genres/Biography"} className="side-bar-link">Biography</Link>
                        <Link to={"/genres/Chick-lit"} className="side-bar-link">Chick-lit</Link>
                        <Link to={"/genres/Children's"} className="side-bar-link">Children's</Link>
                        <Link to={"/genres/"} className="side-bar-link"></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(IndexGenre)