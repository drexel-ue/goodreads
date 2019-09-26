import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import Queries from "../../../graphql/queries";
import './Bookshelf.css';
const { FETCH_USER, CACHED_USER, IS_LOGGED_IN } = Queries;

const BooksList = props => {
    return (
        <div className='bookshelf'>
            <div className='bookshelf-header'>
                <div className='bookshelf-title-container'>
                    <h1 className='bookshelf-title'>
                        <Link to='/bookshelf/all'>My Books</Link>
                    </h1>
                </div>
                <form className='bookshelf-search'>
                    <input type="text" placeholder="Search and add books" />
                    <button type="submit">
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>

            <div className='shelves'>
                <div className='shelves-header'>Bookshelves</div>
                <Link to='/bookshelf/read' className='shelf'>Read</Link>
                <Link to='/bookshelf/reading' className='shelf'>Currently Reading</Link>
                <Link to='/bookshelf/want' className='shelf'>Want to Read</Link>
            </div>

            <ApolloConsumer>{client => (
                    <Query query={IS_LOGGED_IN}>
                        {({ loading, error, data }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) {
                                return <p>Error</p>;
                            }
                            

                            if (data.isLoggedIn) {
                                client.readQuery({
                                    query: gql`
                                      query CachedUser {
                                        _id
                                        name
                                      }
                                    `
                                });

                                return (
                                    <Query query={FETCH_USER} variables={{ _id: data._id }}>
                                        {({ loading, error, data }) => {
                                            if (loading) return <p>Loading...</p>;
                                            if (error) {
                                                return <p>Error</p>;
                                            }

                                            return (
                                                <table className='bookshelf-content'>
                                                    <thead className='table-content'>
                                                        <tr className='table-cols'>
                                                            <th className='table-col cover-col'>cover</th>
                                                            <th className='table-col title-col'>title</th>
                                                            <th className='table-col author-col'>author</th>
                                                            <th className='table-col rating-col'>avg rating</th>
                                                            <th className='table-col shelves-col'>shelves</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className='table-rows'>
                                                        {data.user.shelves[props.idx].books.map(({ _id, coverPhoto, title, authors, rating }, idx) => (
                                                            <tr key={_id} className='table-row'>
                                                                <td className='table-cover'>
                                                                    <label>cover</label>
                                                                    <div className='cover-container'>
                                                                        <Link to={`/book/${_id}`} className='cover-link'>
                                                                            <img src={coverPhoto} alt='cover' />
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                                <td className='table-title'>
                                                                    <label>title</label>
                                                                    <div className='title-container'>
                                                                        <Link to={`/book/${_id}`}>{title}</Link>
                                                                    </div>
                                                                </td>
                                                                <td className='table-author'>
                                                                    <label>author</label>
                                                                    <div className='author-container'>
                                                                        {authors.map((author, idx) => {
                                                                            if (idx === 0) {
                                                                                return author.name;
                                                                            } else {
                                                                                return ", " + author.name;
                                                                            }
                                                                        })}
                                                                    </div>
                                                                </td>
                                                                <td className='table-rating'>
                                                                    <label>avg rating</label>
                                                                    <div>{rating}</div>
                                                                </td>
                                                                <td className='table-shelves'>
                                                                    <label>shelves</label>
                                                                    <div className='shelves-container'>
                                                                        <Link to={`/bookshelf/${props.type}`}>{props.type}</Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )
                                        }}
                                    </Query>
                                )
                            }}
                        }
                    </Query>
                )}
            </ApolloConsumer>
        </div>
    );
};

export default BooksList;