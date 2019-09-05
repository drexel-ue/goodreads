import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
import BookItem from "./BookItem";
import './NewReleases.css';
const { BOOKS_BY_GENRE, FETCH_BOOKS } = Queries;

const NewReleases = (props) => (
    <div className='releases-container'>
        <div className='releases'>
            <div className='releases-float'>
                <div className='left-container'>
                    <h1>New Releases for September 2019</h1>
                    <div className='new-releases'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>young adult</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Young adult' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>children's</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Children\'s' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>history</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'History' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>;

                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>memoir</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Memoir' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>mystery</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Mystery' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>romance</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Romance' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>science fiction</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Science fiction' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>fantasy</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Fantasy' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>historical fiction</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Historical fiction' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>graphic novels</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Graphic novel' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>biography</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Biography' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='genre'>
                                            <h3>autobiography</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Autobiography' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>
                                                
                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='right-container'>
                    <div className='popular-releases'>
                        <div className='release-head-container'>
                            <h2>Popular new releases</h2>
                        </div>
                        <div className='popular-release-body'>
                            <div className='popular-release-content'>
                                <div className='popular'>
                                    <Query query={FETCH_BOOKS}>
                                        {({ loading, error, data }) => {
                                            if (loading) return <p>Loading...</p>;
                                            if (error) return <p>Error</p>;

                                            if (data) {
                                                return data.books.map((book, idx) => {
                                                    if (idx < 15) {
                                                        return (
                                                            <Link to='/'><img src={book.coverPhoto}/></Link>
                                                        );
                                                    }
                                                });
                                            }
                                        }}
                                    </Query>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default withRouter(NewReleases);