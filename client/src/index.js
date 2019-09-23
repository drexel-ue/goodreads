import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
// import { onError } from "apollo-link-error";
// import { ApolloLink } from "apollo-link";
import { HashRouter } from "react-router-dom";
import Mutations from "./graphql/mutations";

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    authorization: localStorage.getItem("auth-token")
  }
});

const client = new ApolloClient({
  link: httpLink,
  connectToDevTools: true,
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const token = localStorage.getItem("auth-token");
const currentUserId = localStorage.getItem("user-id");

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    name: "",
    _id: currentUserId,
    profilePhoto: "",
    email: "",
    currentPage: 0
  }
});

if (token) {
  client
    .mutate({ mutation: Mutations.VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          ...data.verifyUser
        }
      });
    });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
