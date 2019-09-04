import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { withRouter } from "react-router-dom";

export default withRouter(
  class Login extends Component {
    constructor(props) {
      super(props);

      this.state = {
        email: "",
        password: ""
      };
    }

    update(field) {
      return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, { data }) {
      debugger;
      // here we can write directly to our cache with our returned mutation data
      client.writeData({
        data: { user: data.login, isLoggedIn: data.login.loggedIn }
      });
    }

    render() {
      return (
        <Mutation
          mutation={Mutations.LOGIN_USER}
          onCompleted={data => {
            const { token } = data.login;
            localStorage.setItem("auth-token", token);
            this.props.history.push("/");
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {loginUser => (
            <div className="login">
              <form
                className="login-form"
                onSubmit={e => {
                  e.preventDefault();
                  loginUser({
                    variables: {
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <input
                  className="login-email"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email address"
                />
                <input
                  className="login-password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                />
                <button type="submit">Sign In</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    }
  }
);
