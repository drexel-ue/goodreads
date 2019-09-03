import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import Login from "../session/Login";
import "./Nav.css";
const { IS_LOGGED_IN } = Queries;

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      browseClicked: false,
      commClicked: false,
      userClicked: false
    };
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                  <div className="navbar">
                    <div className="navbar-contents">
                      <Link to="/" className="in-logo">
                        bad
                      </Link>
                      <Link to="/" className="in-logo2">
                        reads
                      </Link>
                      <nav className="main-nav">
                        <ul className="nav-list">
                          <li className="nav-list-item">
                            <Link to="/" className="nav-link">
                              Home
                            </Link>
                          </li>
                          <li className="nav-list-item">
                            <Link to="/bookshelf" className="nav-link">
                              My Books
                            </Link>{" "}
                            {/* Change link later to bookshelf */}
                          </li>
                          <li className="nav-list-item">
                            <div className="dropdown">
                              <button
                                className="dropbtn"
                                onClick={e => {
                                  e.preventDefault();

                                  if (!this.state.browseClicked) {
                                    this.setState({
                                      browseClicked: true,
                                      commClicked: false,
                                      userClicked: false
                                    });
                                  } else {
                                    this.setState({
                                      browseClicked: false
                                    });
                                  }
                                }}
                              >
                                Browse
                              </button>
                              <div
                                className={`dropdown-content ${
                                  this.state.browseClicked ? "reveal" : "hide"
                                }`}
                              >
                                <div className="dropdown-item">
                                  <Link to="/recommendations">
                                    Recommendations
                                  </Link>
                                </div>
                                <div className="dropdown-item">
                                  <Link to="/new_releases">New Releases</Link>
                                </div>
                                <div className="dropdown-item">
                                  <Link to="/list">Lists</Link>
                                </div>
                                <div className="dropdown-item">
                                  <Link to="/book">Explore</Link>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="nav-list-item">
                            <div className="dropdown">
                              <button
                                className="dropbtn"
                                onClick={e => {
                                  e.preventDefault();

                                  if (!this.state.commClicked) {
                                    this.setState({
                                      commClicked: true,
                                      browseClicked: false,
                                      userClicked: false
                                    });
                                  } else {
                                    this.setState({
                                      commClicked: false
                                    });
                                  }
                                }}
                              >
                                Community
                              </button>
                              <div
                                className={`dropdown-content ${
                                  this.state.commClicked ? "reveal" : "hide"
                                }`}
                              >
                                <div className="dropdown-item">
                                  <Link to="/group">Groups</Link>
                                </div>
                                <div className="dropdown-item">
                                  <Link to="/topic">Discussions</Link>
                                </div>
                                <div className="dropdown-item">
                                  <Link to="/quotes">Quotes</Link>
                                </div>
                                <div className="dropdown-item">
                                  <Link to="/best_reviewers">People</Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </nav>

                      <form className="search">
                        <input type="text" placeholder="Search books" />
                        <button type="submit">
                          <i className="fa fa-search"></i>
                        </button>
                      </form>

                      <div className="personal-nav">
                        <ul className="personal-nav-list">
                          <li className="personal-nav-list-item">
                            <Link to="/group" className="personal-link">
                              <i className="far fa-comments"></i>
                            </Link>
                          </li>
                          <li className="personal-nav-list-item">
                            <Link to="/inbox" className="personal-link">
                              <i className="fa fa-envelope-o"></i>
                            </Link>
                          </li>
                          <li className="personal-nav-list-item">
                            <Link to="/friend" className="personal-link">
                              <i className="fas fa-user-friends"></i>
                            </Link>
                          </li>
                          <li className="personal-nav-list-item">
                            <div className="profile-dropdown">
                              <button
                                className="profile-dropbtn"
                                onClick={e => {
                                  e.preventDefault();

                                  if (!this.state.userClicked) {
                                    this.setState({
                                      userClicked: true,
                                      browseClicked: false,
                                      commClicked: false
                                    });
                                  } else {
                                    this.setState({
                                      userClicked: false
                                    });
                                  }
                                }}
                              >
                                <i className="fa fa-user-circle-o"></i>
                              </button>
                              <div
                                className={`profile-dropdown-content ${
                                  this.state.userClicked ? "reveal" : "hide"
                                }`}
                              >
                                <div className="profile-dropdown-item">
                                  <Link to="/">Profile</Link>
                                </div>
                                <div className="profile-dropdown-item">
                                  <Link to="/friend">Friends</Link>
                                </div>
                                <div className="profile-dropdown-item">
                                  <Link to="/group">Groups</Link>
                                </div>
                                <div className="profile-dropdown-item">
                                  <Link to="/topic">Discussions</Link>
                                </div>
                                <div className="profile-dropdown-item">
                                  <Link to="/">Comments</Link>
                                </div>
                                <div className="profile-dropdown-item">
                                  <Link to="/quotes">Quotes</Link>
                                </div>
                                <div className="profile-dropdown-item">
                                  <Link to="/edit_fav_genres">
                                    Favorite genres
                                  </Link>
                                </div>
                                <div className="profile-dropdown-item">
                                  <Link to="/friend_recommendations">
                                    Friends' recommendations
                                  </Link>
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
