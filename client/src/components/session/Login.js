import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { withRouter } from "react-router-dom";
import "./Session.css";

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
      // here we can write directly to our cache with our returned mutation data
      client.writeData({
        data: { ...data.login }
      });
    }

    render() {
      return (
        <Mutation
          mutation={Mutations.LOGIN_USER}
          onCompleted={data => {
            const { token, _id } = data.login;
            localStorage.setItem("auth-token", token);
            localStorage.setItem("user-id", _id);
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
                  }).catch(e => {
                    const register = document.getElementById("errors");
                    register.innerHTML = "";
                    
                    const div = document.getElementById('login-errors');
                    let m = e.message.toString().slice(15);

                    div.innerHTML = `<p class='error'>${m}</p>`;
                  })
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
