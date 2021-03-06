import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
import BookItem from "../new_releases/BookItem";
import './Explore.css';
const { BOOKS_BY_GENRE, FETCH_BOOKS,BOOK_SEARCH } = Queries;

class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            queryString: ""
        };

        this.dropdownTimer = undefined;
        this.searchTimer = undefined;

        this.handleInput = this.handleInput.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.cancelClear = this.cancelClear.bind(this);
        this.toggleRadio = this.toggleRadio.bind(this);
    }

    toggleRadio(field) {
        return e => {
            this[field].toggleAttribute("checked");
        }
    }

    handleInput(event) {
        event.preventDefault();
        this.setState({ queryString: event.currentTarget.value });
      }
    
      clearSearch(event) {
        event.preventDefault();
        this.searchTimer = setTimeout(
          () => this.setState({ queryString: "" }),
          250
        );
      }
    
      cancelClear(event) {
        event.preventDefault();
        clearTimeout(this.searchTimer);
      }

    render () {
        return (
            <div className='explore-container'>
                <div className='explore'>
                    <div className='explore-float'>
                        <h1>Explore Books</h1>
                        <div className='left-explore-container'>
                            <form className='explore-search'>
                            <Query
                        query={BOOK_SEARCH}
                        variables={{
                          queryString: this.state.queryString,
                          offset: 0,
                          limit: 10
                        }}
                      >
                        {({ loading, data }) => {
                          let results = [];
                          if (data) results = data.bookSearch;
                          return (
                            <div className="search">
                              <input
                                onChange={this.handleInput}
                                onClick={this.handleInput}
                                type="text"
                                placeholder="Search books"
                                  />
                                  <Link  to={{
                                    pathname: "/search",
                                    state: {
                                      queryString: this.state.queryString
                                    }
                                  }}>
                              <button 
                                onMouseEnter={this.cancelClear}                              
                                className="needless_button"
                                type="none">
                                {loading ? (
                                  <i className="fas fa-spinner fa-pulse"></i>
                                ) : (
                                    <div>Search</div>
                                )}
                                      </button>
                                      </Link>
                              <div
                                onMouseEnter={this.cancelClear}
                                onMouseLeave={this.clearSearch}
                                className={`search_bar_results ${
                                  results.length > 0 ? "" : "hide"
                                }`}
                              >
                                {results.map((book, index) => (
                                  <Link key={index} to={`/book/${book._id}`}>
                                    <div className="search_bar_result">
                                      <img
                                        className="cover"
                                        alt="cover"
                                        src={book.coverPhoto}
                                      />
                                      <div className="info">
                                        <div className="title">
                                          {book.title}
                                        </div>
                                        <div className="author">
                                          {`by ${book.authors[0].name}`}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                                <Link
                                  to={{
                                    pathname: "/search",
                                    state: {
                                      queryString: this.state.queryString
                                    }
                                  }}
                                >
                                  <div className="see_all_results">
                                    {`See all results for "${this.state.queryString}"`}
                                  </div>
                                </Link>
                              </div>
                            </div>
                          );
                        }}
                      </Query>
                                <div className='search-fields'>
                                    <label>Fields to search</label>
                                    <input type='radio' value='all' id='search-field-all' name='explore-radio' ref={explore => this.allNode = explore} onClick={this.toggleRadio("allNode")}/>
                                    <label htmlFor='search-field-all'>All</label>
                                    <input type='radio' value='title' id='search-field-title' name='explore-radio' ref={explore => this.titleNode = explore} onClick={this.toggleRadio("titleNode")}/>
                                    <label htmlFor='search-field-title'>Title</label>
                                    <input type='radio' value='author' id='search-field-author' name='explore-radio' ref={explore => this.authorNode = explore} onClick={this.toggleRadio("authorNode")}/>
                                    <label htmlFor='search-field-author'>Author</label>
                                    <input type='radio' value='genre' id='search-field-genre' name='explore-radio' ref={explore => this.genreNode = explore} onClick={this.toggleRadio("genreNode")}/>
                                    <label htmlFor='search-field-genre'>Genre</label>
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
                                                        const today = new Date();
                                                        const year = today.getFullYear();
                                                        const month = today.getMonth();
                                                        let count = 0;

                                                        return data.books.map((book, index) => {
                                                            const bookYear = book.publishDate.slice(0, 4);
                                                            const bookMonth = book.publishDate.slice(6, 7);

                                                            if (count < 5 && year >= bookYear && (month + 1) === bookMonth) {
                                                                count += 1;
                                                                return (
                                                                    <div key={index} className='new-book'>
                                                                        <div className='new-book-cover'>
                                                                            <Link to={`/book/${book._id}`}><img src={book.coverPhoto} alt='book cover' /></Link>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            } return <div key={index}></div>
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
                                                        const today = new Date();
                                                        const year = today.getFullYear();
                                                        let count = 0;

                                                        return data.books.map((book, index) => {
                                                            const bookYear = book.publishDate.slice(0, 4);

                                                            if (count < 5 && year >= bookYear) {
                                                                count += 1;
                                                                return (
                                                                    <div key={index} className='new-book'>
                                                                        <div className='new-book-cover'>
                                                                            <Link to={`/book/${book._id}`}><img src={book.coverPhoto} alt='book cover'/></Link>
                                                                        </div>
                                                                        <div className='clear'></div>
                                                                    </div>
                                                                );
                                                            } return <div key={index}></div>
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
                                                        return data.books.map((book, index) => {
                                                            if (index < 5) {
                                                                return (
                                                                    <div key={index} className='new-book'>
                                                                        <div className='new-book-cover'>
                                                                            <Link to={`/book/${book._id}`}><img src={book.coverPhoto} alt='book cover'/></Link>
                                                                        </div>
                                                                        <div className='clear'></div>
                                                                    </div>
                                                                );
                                                            } return <div key={index}></div>
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
                                            <Link to='/genres/Alternate-history'>Alternate History</Link>
                                            <br></br>
                                            <Link to='/genres/Anthology'>Anthology</Link>
                                            <br></br>
                                            <Link to='/genres/Art'>Art</Link>
                                            <br></br>
                                            <Link to='/genres/Autobiography'>Autobiography</Link>
                                            <br></br>
                                            <Link to='/genres/Biography'>Biography</Link>
                                            <br></br>
                                            <Link to='/genres/Chick-lit'>Chick Lit</Link>
                                            <br></br>
                                            <Link to="/genres/Children's">Children's</Link>
                                            <br></br>
                                            <Link to='/genres/Comic-book'>Comic Book</Link>
                                            <br></br>
                                            <Link to='/genres/Coming-of-age'>Coming of Age</Link>
                                            <br></br>
                                            <Link to='/genres/Cookbook'>Cookbook</Link>
                                            <br></br>
                                            <Link to='/genres/Crime'>Crime</Link>
                                            <br></br>
                                            <Link to='/genres/Diary'>Diary</Link>
                                            <br></br>
                                            <Link to='/genres/Dictionary'>Dictionary</Link>
                                            <br></br>
                                            <Link to='/genres/Drama'>Drama</Link>
                                            <br></br>
                                            <Link to='/genres/Encyclopedia'>Encyclopedia</Link>
                                            <br></br>
                                            <Link to='/genres/Fairytale'>Fairytale</Link>
                                            <br></br>
                                            <Link to='/genres/Fantasy'>Fantasy</Link>
                                            <br></br>
                                            <Link to='/genres/Graphic-novel'>Graphic Novel</Link>
                                            <br></br>
                                            <Link to='/genres/Guide'>Guide</Link>
                                            <br></br>
                                            <Link to='/genres/Health'>Health</Link>
                                            <br></br>
                                            <Link to='/Historical-fiction'>Historical Fiction</Link>
                                            <br></br>
                                            <Link to='/genres/History'>History</Link>
                                        </div>
                                        <div className='explore-genres'>
                                            <Link to='/genres/Horror'>Horror</Link>
                                            <br></br>
                                            <Link to='/genres/Journal'>Journal</Link>
                                            <br></br>
                                            <Link to='/genres/Math'>Math</Link>
                                            <br></br>
                                            <Link to='/genres/Memoir'>Memoir</Link>
                                            <br></br>
                                            <Link to='/genres/Mystery'>Mystery</Link>
                                            <br></br>
                                            <Link to='/genres/Paranormal-romance'>Paranormal Romance</Link>
                                            <br></br>
                                            <Link to='/genres/Picture-book'>Picture Book</Link>
                                            <br></br>
                                            <Link to='/genres/Poetry'>Poetry</Link>
                                            <br></br>
                                            <Link to='/genres/Political-thriller'>Political Thriller</Link>
                                            <br></br>
                                            <Link to='/genres/Prayer'>Prayer</Link>
                                            <br></br>
                                            <Link to='/genres/Review'>Review</Link>
                                            <br></br>
                                            <Link to='/genres/Romance'>Romance</Link>
                                            <br></br>
                                            <Link to='/genres/Satire'>Satire</Link>
                                            <br></br>
                                            <Link to='/genres/Science'>Science</Link>
                                            <br></br>
                                            <Link to='/genres/Science-fiction'>Science Fiction</Link>
                                            <br></br>
                                            <Link to='/genres/Self-help'>Self Help</Link>
                                            <br></br>
                                            <Link to='/genres/Short-story'>Short Story</Link>
                                            <br></br>
                                            <Link to='/genres/Suspense'>Suspense</Link>
                                            <br></br>
                                            <Link to='/genres/Textbook'>Textbook</Link>
                                            <br></br>
                                            <Link to='/genres/Thriller'>Thriller</Link>
                                            <br></br>
                                            <Link to='/genres/Travel'>Travel</Link>
                                            <br></br>
                                            <Link to='/genres/True-crime'>True Crime</Link>
                                            <br></br>
                                            <Link to='/genres/Young-adult'>Young Adult</Link>
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