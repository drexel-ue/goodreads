import gql from "graphql-tag";

export default {
  FETCH_USER: gql`
    query FetchUser($_id: ID!) {
      user(_id: $_id) {
        shelves {
          books {
            _id
            coverPhoto
            title
            authors {
              name
            }
            rating {
              stars
            }
          }
        }
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  CACHED_USER: gql`
    query WhoDis {
      user {
        name @client
      }
    }
  `
};