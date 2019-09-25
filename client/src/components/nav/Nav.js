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
      showBrowseDropdown: false,
      commClicked: false,
      userClicked: false
    };

    this.timer = undefined;

    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  showDropdown(field) {
    return event => {
      event.preventDefault();
      clearTimeout(this.timer);
      this.setState({ [field]: true });
    };
  }

  hideDropdown(field) {
    return event => {
      event.preventDefault();
      this.timer = setTimeout(
        () => this.setState({ [field]: false }),
        field === "userClicked" ? 100 : 1
      );
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
                  <div className='navbar'>
                    <div className='navbar-contents'>
                      <div className='logo'>
                        <Link to='/' className='in-logo'>bad</Link><Link to='/' className='in-logo2'>reads</Link>
                      </div>
                      <nav className='main-nav'>
                        <ul className='nav-list'>
                          <li className='nav-list-item'>
                            <Link to='/' className='nav-link'>Home</Link>
                          </li>
                          <li className="nav-list-item">
                            <Link to="/bookshelf/read" className="nav-link">
                              My Books
                            </Link>
                          </li>
                          <li className="nav-list-item">
                            <div className="dropdown">
                              <button
                                className="dropbtn"
                                onMouseEnter={this.showDropdown(
                                  "showBrowseDropdown"
                                )}
                                onMouseLeave={this.hideDropdown(
                                  "showBrowseDropdown"
                                )}
                              >
                                Browse
                              </button>
                              <div
                                onMouseEnter={this.showDropdown(
                                  "showBrowseDropdown"
                                )}
                                onMouseLeave={this.hideDropdown(
                                  "showBrowseDropdown"
                                )}
                                className={`dropdown-content ${
                                  this.state.showBrowseDropdown
                                    ? "reveal"
                                    : "hide"
                                }`}
                              >
                                <div className="dropdown-item">
                                  <Link to='/new_releases'>New Releases</Link>
                                </div>
                                <div className="dropdown-item">
                                  <Link to='/book'>Explore</Link>
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

                      <div className='personal-nav'>
                        <ul className='personal-nav-list'>
                          <li className='personal-nav-list-item'>
                            <Link to='/friend' className='personal-link'><i className='fas fa-user-friends'></i></Link>
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
                                  <Link to="/">Profile</Link>
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
