import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
import BookItem from "../new_releases/BookItem";
import './Explore.css';
const { BOOKS_BY_GENRE, FETCH_BOOKS } = Queries;

class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.toggleRadio = this.toggleRadio.bind(this);
    }

    toggleRadio(field) {
        return e => {
            this[field].toggleAttribute("checked");
        }
    }

    render () {
        return (
            <div className='explore-container'>
                <div className='explore'>
                    <div className='explore-float'>
                        <h1>Explore Books</h1>
                        <div className='left-explore-container'>
                            <form className='explore-search'>
                                <input type='text' placeholder='Search by title, author, or ISBN' className='explore-search-input' />
                                <button>Search</button>
                                <div className='search-fields'>
                                    <label>Fields to search</label>
                                    <input type='radio' value='all' id='search-field-all' name='explore-radio' ref={explore => this.allNode = explore} onClick={this.toggleRadio("allNode")}/>
                                    <label for='search-field-all'>All</label>
                                    <input type='radio' value='title' id='search-field-title' name='explore-radio' ref={explore => this.titleNode = explore} onClick={this.toggleRadio("titleNode")}/>
                                    <label for='search-field-title'>Title</label>
                                    <input type='radio' value='author' id='search-field-author' name='explore-radio' ref={explore => this.authorNode = explore} onClick={this.toggleRadio("authorNode")}/>
                                    <label for='search-field-author'>Author</label>
                                    <input type='radio' value='genre' id='search-field-genre' name='explore-radio' ref={explore => this.genreNode = explore} onClick={this.toggleRadio("genreNode")}/>
                                    <label for='search-field-genre'>Genre</label>
                                </div>
                                <div className='clear'></div>
                            </form>
                            <div className='explore-box'>
                                <div className='explore-box-header-container'>
                                    <h2>
                                        <Link to='/'>NEW RELEASES IN FANTASY</Link>
                                    </h2>
                                </div>
                                <div className='explore-box-body'>
                                    <div className='explore-box-content'>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Fantasy' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>

                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                        <div className='clear'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='explore-box'>
                                <div className='explore-box-header-container'>
                                    <h2>
                                        <Link to='/'>NEW RELEASES IN HORROR</Link>
                                    </h2>
                                </div>
                                <div className='explore-box-body'>
                                    <div className='explore-box-content'>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Horror' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>

                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                        <div className='clear'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='explore-box'>
                                <div className='explore-box-header-container'>
                                    <h2>
                                        <Link to='/'>NEW RELEASES IN HISTORICAL FICTION</Link>
                                    </h2>
                                </div>
                                <div className='explore-box-body'>
                                    <div className='explore-box-content'>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Historical Fiction' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>

                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                        <div className='clear'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='explore-box'>
                                <div className='explore-box-header-container'>
                                    <h2>
                                        <Link to='/'>NEW RELEASES IN YOUNG ADULT</Link>
                                    </h2>
                                </div>
                                <div className='explore-box-body'>
                                    <div className='explore-box-content'>
                                        <Query query={BOOKS_BY_GENRE} variables={{ genreString: 'Young adult' }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <p>Error</p>

                                                if (data) return <BookItem data={data} />;
                                            }}
                                        </Query>
                                        <div className='clear'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='explore-box'>
                                <div className='explore-box-header-container'>
                                    <h2>
                                        <Link to='/'>NEW RELEASES THIS MONTH</Link>
                                    </h2>
                                </div>
                                <div className='explore-box-body'>
                                    <div className='explore-box-content'>
                                        <div className='new-books-container'>
                                            <Query query={FETCH_BOOKS}>
                                                {({ loading, error, data }) => {
                                                    if (loading) return <p>Loading...</p>;
                                                    if (error) return <p>Error</p>;

                                                    if (data) {
                                                        return data.books.map((book, idx) => {
                                                            if (idx < 5) {
                                                                return (
                                                                    <div className='new-book'>
                                                                        <div className='new-book-cover'>
                                                                            <Link to='/'><img alt="" src={book.coverPhoto} /></Link>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            } else {
                                                                return (
                                                                <div></div>
                                                                )
                                                            }
                                                        });
                                                    }
                                                }}
                                            </Query>
                                            <div className='clear'></div>
                                        </div>
                                        <div className='clear'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='explore-box'>
                                <div className='explore-box-header-container'>
                                    <h2>
                                        <Link to='/'>NEW RELEASES THIS YEAR</Link>
                                    </h2>
                                </div>
                                <div className='explore-box-body'>
                                    <div className='explore-box-content'>
                                        <div className='new-books-container'>
                                            <Query query={FETCH_BOOKS}>
                                                {({ loading, error, data }) => {
                                                    if (loading) return <p>Loading...</p>;
                                                    if (error) return <p>Error</p>;

                                                    if (data) {
                                                        return data.books.map((book, idx) => {
                                                            if (idx < 5) {
                                                                return (
                                                                    <div className='new-book'>
                                                                        <div className='new-book-cover'>
                                                                            <Link to='/'><img src={book.coverPhoto} /></Link>
                                                                        </div>
                                                                        <div className='clear'></div>
                                                                    </div>
                                                                );
                                                            }
                                                        });
                                                    }
                                                }}
                                            </Query>
                                            <div className='clear'></div>
                                        </div>
                                        <div className='clear'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='explore-box'>
                                <div className='explore-box-header-container'>
                                    <h2>
                                        <Link to='/'>POPULAR THIS WEEK</Link>
                                    </h2>
                                </div>
                                <div className='explore-box-body'>
                                    <div className='explore-box-content'>
                                        <div className='new-books-container'>
                                            <Query query={FETCH_BOOKS}>
                                                {({ loading, error, data }) => {
                                                    if (loading) return <p>Loading...</p>;
                                                    if (error) return <p>Error</p>;

                                                    if (data) {
                                                        return data.books.map((book, idx) => {
                                                            if (idx < 5) {
                                                                return (
                                                                    <div className='new-book'>
                                                                        <div className='new-book-cover'>
                                                                            <Link to='/'><img src={book.coverPhoto} /></Link>
                                                                        </div>
                                                                        <div className='clear'></div>
                                                                    </div>
                                                                );
                                                            }
                                                        });
                                                    }
                                                }}
                                            </Query>
                                            <div className='clear'></div>
                                        </div>
                                        <div className='clear'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right-explore-container'>
                            <div className='explore-box'>
                                <div className='explore-box-header-container'>
                                    <h2>
                                        <Link to='/'>GENRES</Link>
                                    </h2>
                                </div>
                                <div className='explore-box-body'>
                                    <div className='explore-box-content'>
                                        <div className='explore-genres'>
                                            <Link to='/'>Alternate History</Link>
                                            <br></br>
                                            <Link to='/'>Art</Link>
                                            <br></br>
                                            <Link to='/'>Autobiography</Link>
                                            <br></br>
                                            <Link to='/'>Comic Book</Link>
                                            <br></br>
                                            <Link to='/'>Coming of Age</Link>
                                            <br></br>
                                            <Link to='/'>Crime</Link>
                                            <br></br>
                                            <Link to='/'>Diary</Link>
                                            <br></br>
                                            <Link to='/'>Dictionary</Link>
                                            <br></br>
                                            <Link to='/'>Drama</Link>
                                            <br></br>
                                            <Link to='/'>Encyclopedia</Link>
                                            <br></br>
                                            <Link to='/'>Fairytale</Link>
                                            <br></br>
                                            <Link to='/'>Fantasy</Link>
                                            <br></br>
                                            <Link to='/'>Graphic Novel</Link>
                                            <br></br>
                                            <Link to='/'>Guide</Link>
                                            <br></br>
                                            <Link to='/'>Health</Link>
                                            <br></br>
                                            <Link to='/'>Historical Fiction</Link>
                                            <br></br>
                                            <Link to='/'>History</Link>
                                            <br></br>
                                            <Link to='/'>Horror</Link>
                                            <br></br>
                                            <Link to='/'>Journal</Link>
                                            <br></br>
                                            <Link to='/'>Math</Link>
                                        </div>
                                        <div className='explore-genres'>
                                            <Link to='/'>Memoir</Link>
                                            <br></br>
                                            <Link to='/'>Mystery</Link>
                                            <br></br>
                                            <Link to='/'>Paranormal Romance</Link>
                                            <br></br>
                                            <Link to='/'>Picture Book</Link>
                                            <br></br>
                                            <Link to='/'>Poetry</Link>
                                            <br></br>
                                            <Link to='/'>Political Thriller</Link>
                                            <br></br>
                                            <Link to='/'>Prayer</Link>
                                            <br></br>
                                            <Link to='/'>Review</Link>
                                            <br></br>
                                            <Link to='/'>Romance</Link>
                                            <br></br>
                                            <Link to='/'>Satire</Link>
                                            <br></br>
                                            <Link to='/'>Science</Link>
                                            <br></br>
                                            <Link to='/'>Science Fiction</Link>
                                            <br></br>
                                            <Link to='/'>Self Help</Link>
                                            <br></br>
                                            <Link to='/'>Short Story</Link>
                                            <br></br>
                                            <Link to='/'>Suspense</Link>
                                            <br></br>
                                            <Link to='/'>Textbook</Link>
                                            <br></br>
                                            <Link to='/'>Thriller</Link>
                                            <br></br>
                                            <Link to='/'>Travel</Link>
                                            <br></br>
                                            <Link to='/'>True Crime</Link>
                                            <br></br>
                                            <Link to='/'>Young Adult</Link>
                                        </div>
                                        <div className='clear'></div>
                                        <div className='explore-more-genres'>
                                            <Link to='/'>More genres...</Link>
                                        </div>
                                        <div className='clear'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='clear'></div>
                </div>
                <div className='clear'></div>
            </div>
        );
    }
}
    

export default withRouter(Explore);