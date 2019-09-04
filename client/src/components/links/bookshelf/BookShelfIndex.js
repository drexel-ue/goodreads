import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../../graphql/queries";
import './Bookshelf.css';
const { FETCH_USER } = Queries;

const BooksList = () => {
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
                <Link to='/bookshelf/all' className='shelf'>All</Link>
                <Link to='/' className='shelf'>Read</Link>
                <Link to='/' className='shelf'>Currently Reading</Link>
                <Link to='/' className='shelf'>Want to Read</Link>
            </div>

            <table className='bookshelf-content'>
                <Query query={FETCH_USER} variables={{ _id: "5d7010f3e5aa7118703a7b18" }}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) {
                            return <p>Error</p>;
                        }

                        return (
                            <thead className='table-content'>
                                <tr classname='table-cols'>
                                    <th className='table-col cover-col'><Link to='/'>cover</Link></th>
                                    <th className='table-col title-col'><Link to='/'>title</Link></th>
                                    <th className='table-col author-col'><Link to='/'>author</Link></th>
                                    <th className='table-col rating-col'><Link to='/'>avg rating</Link></th>
                                    <th className='table-col rate-col'><Link to='/'>rating</Link></th>
                                    <th className='table-col shelves-col'><Link to='/'>shelves</Link></th>
                                    <th className='table-col read-col'><Link to='/'>date read</Link></th>
                                    <th className='table-col added-col'><Link to='/'>date added</Link></th>
                                </tr>

                                <tbody className='table-rows'>
                                    {data.user.shelves[0].books.map(({ _id, coverPhoto, title, authors, rating }, idx) => (
                                        <tr key={_id} className='table-row'>
                                            <td className='table-cover'>
                                                <label>cover</label>
                                                <div className='cover-container'>
                                                    <Link to='/' className='cover-link'>
                                                        <img src={coverPhoto} alt='cover'/>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className='table-title'>
                                                <label>title</label>
                                                <div className='title-container'>
                                                    <Link to='/'>{title}</Link>
                                                </div>
                                            </td>
                                            <td className='table-author'>
                                                <label>author</label>
                                                <div className='author-container'>
                                                    {authors.map((author, idx) => {
                                                        if (idx === 0) {
                                                            return (
                                                                <Link to='/' key={idx}>{author.name}</Link>
                                                            )
                                                        } else {
                                                            return (
                                                                <Link to='/' key={idx}>, {author.name}</Link>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </td>
                                            <td className='table-rating'>
                                                <label>avg rating</label>
                                                <div>Rating</div>
                                            </td>
                                            <td className='table-rate'>
                                                <label>rating</label>
                                                <div>Rate here!</div>
                                            </td>
                                            <td className='table-shelves'>
                                                <label>shelves</label>
                                                <div className='shelves-container'>
                                                    <Link to='/bookshelf/all'>all</Link>
                                                </div>
                                            </td>
                                            <td className='table-read'>
                                                <label>date read</label>
                                                <div>{Date.now()}</div>
                                            </td>
                                            <td className='table-added'>
                                                <label>date added</label>
                                                <div>{Date.now()}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </thead>
                        )
                    }}
                </Query>
            </table>
        </div>
    );
};

export default BooksList;