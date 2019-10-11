import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Queries from "../../graphql/queries";
import Login from "../session/Login";
import "./Nav.css";
import "./search_bar.scss";

const { FETCH_USER_ID, IS_LOGGED_IN, BOOK_SEARCH } = Queries;

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: "",
      userClicked: false
    };

    this.dropdownTimer = undefined;
    this.searchTimer = undefined;

    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.cancelClear = this.cancelClear.bind(this);
    this.browse = this.browse.bind(this);
  }

  showDropdown(field) {
    return event => {
      event.preventDefault();
      clearTimeout(this.dropdownTimer);
      this.setState({ [field]: true });
    };
  }

  hideDropdown(field) {
    return event => {
      event.preventDefault();
      this.dropdownTimer = setTimeout(
        () => this.setState({ [field]: false }),
        field === "userClicked" ? 500 : 1
      );
    };
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

  browse(e) {
    e.preventDefault();

    this.props.history.push("/book");
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                const { _id } = client.readQuery({
                  query: gql`
                    query CachedUser {
                      _id
                    }
                  `
                });

                return (
                  <div className="navbar">
                    <div className="navbar-contents">
                      <div className="logo">
                        <Link to="/" className="in-logo">
                          bad
                        </Link>
                        <Link to="/" className="in-logo2">
                          reads
                        </Link>
                      </div>

                      <nav className="main-nav">
                        <ul className="nav-list">
                          <li className="nav-list-item">
                            <Link to="/" className="nav-link">
                              Home
                            </Link>
                          </li>
                          <li className="nav-list-item">
                            <Link to="/bookshelf/read" className="nav-link">
                              My Books
                            </Link>
                          </li>
                          <li className="nav-list-item">
                            <Link to="/book" className="nav-link">
                              Browse
                            </Link>
                          </li>
                          <li className="nav-list-item">
                            <Link to="/about" className="nav-link">
                              About
                            </Link>
                          </li>
                        </ul>
                      </nav>

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
                            <form className="search">
                              <input
                                onChange={this.handleInput}
                                onClick={this.handleInput}
                                type="text"
                                placeholder="Search books"
                              />
                              <button className="needless_button" type="none">
                                {loading ? (
                                  <i className="fas fa-spinner fa-pulse"></i>
                                ) : (
                                  <i className="fa fa-search"></i>
                                )}
                              </button>
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
                            </form>
                          );
                        }}
                      </Query>

                      <div className="personal-nav">
                        <ul className="personal-nav-list">
                          <li className="personal-nav-list-item">
                            <Link to="/friend" className="personal-link">
                              <i className="fas fa-user-friends"></i>
                            </Link>
                          </li>
                          <li className="personal-nav-list-item">
                            <div className="profile-dropdown">
                              <button
                                className="profile-dropbtn"
                                onMouseEnter={this.showDropdown("userClicked")}
                                onMouseLeave={this.hideDropdown("userClicked")}
                              >
                                <i className="fa fa-user-circle-o"></i>
                              </button>
                              <div
                                onMouseEnter={this.showDropdown("userClicked")}
                                onMouseLeave={this.hideDropdown("userClicked")}
                                className={`profile-dropdown-content ${
                                  this.state.userClicked ? "reveal" : "hide"
                                }`}
                              >
                                <div className="profile-dropdown-item">
                                  <Link to={`/users/${_id}`}>Profile</Link>
                                </div>
                                <div className="profile-dropdown-item">
                                  <Link to="/friend">Friends</Link>
                                </div>
                                <button
                                  className="profile-dropdown-button"
                                  onClick={e => {
                                    e.preventDefault();
                                    localStorage.removeItem("auth-token");
                                    client.writeData({
                                      data: { isLoggedIn: false }
                                    });
                                    this.setState({
                                      browseClicked: false,
                                      commClicked: false,
                                      userClicked: false
                                    });
                                    this.props.history.push("/register");
                                  }}
                                >
                                  Sign out
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="navbar">
                    <Link to="/" className="out-logo">
                      bad
                    </Link>
                    <Link to="/" className="out-logo2">
                      reads
                    </Link>
                    <Login />
                  </div>
                );
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(Nav);
