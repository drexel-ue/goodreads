import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import "./Session.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    // here we can write directly to our cache with our returned mutation data
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={Mutations.REGISTER_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div className='register-form'>
            <div id='login-errors'></div>
            <p>New here? Create a free account!</p>
            <div id='errors'></div>
            <form
              onSubmit={e => {
                e.preventDefault();
                registerUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                  }
                }).catch(e => {
                  const login = document.getElementById("login-errors");
                  login.innerHTML = "";

                  const div = document.getElementById('errors');
                  let m = e.message.toString().slice(15);

                  div.innerHTML = `<p class='error'>${m}</p>`;
                })
              }}
            >
              <input
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Name"
              />
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email address"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Sign up</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
