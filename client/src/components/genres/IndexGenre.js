import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./IndexGenre.css"
const { BOOKS_BY_GENRE } = Queries

const IndexGenre = props => {
    return (
        <div>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Science fiction"}}>

            {({ loading, error, data }) => {
                // debugger
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <ul>Science Fiction
                        {data.booksByGenre.map(book =>(
                            <li className="list-item" key={book._id}>
                                <img className="img" src={book.coverPhoto} alt=""></img> 
                                <div>{book.title}</div>
                                <div>{book.description}</div>
                            </li>
                        ))}
                    </ul>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Suspense"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <ul>Suspense
                        {data.booksByGenre.map(book =>(
                            <li key={book._id}>
                                <div>{book.title}</div>
                                <div>{book.description}</div>
                            </li>
                        ))}
                    </ul>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Fantasy"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <ul>Fantasy
                        {data.booksByGenre.map(book =>(
                            <li key= { book._id }>
                                <div>{book.title}</div>
                                <div>{book.description}</div>
                            </li>
                        ))}
                    </ul>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "History"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <ul>History
                        {data.booksByGenre.map(book =>(
                            <li key={book._id}>
                                <div>{book.title}</div>
                                <div>{book.description}</div>
                            </li>
                        ))}
                    </ul>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Paranormal romance"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <ul>Paranormal Romance
                        {data.booksByGenre.map(book =>(
                            <li key={book._id}>
                                <div>{book.title}</div>
                                <div>{book.description}</div>
                            </li>
                        ))}
                    </ul>
                )
            }
        }
        </Query>
        <Query query={BOOKS_BY_GENRE} variables={{ genreString: "Chick lit"}}>

            {({ loading, error, data }) => {

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <ul>Chick Lit
                        {data.booksByGenre.map(book =>(
                            <li key={book._id}>
                                <div>{book.title}</div>
                                <div>{book.description}</div>
                            </li>
                        ))}
                    </ul>
                )
            }
        }
        </Query>
        </div>
    )
}

export default withRouter(IndexGenre)