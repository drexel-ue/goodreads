import gql from "graphql-tag";

export default {
  FETCH_PRODUCTS: gql`
    {
      products {
        _id
        name
        description
      }
    }
  `,
  FETCH_PRODUCT: gql`
    query FetchProduct($_id: ID!) {
      product(_id: $_id) {
        _id
        name
        description
        weight
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
};
