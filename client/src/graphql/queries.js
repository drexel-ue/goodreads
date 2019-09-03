import gql from "graphql-tag";

export default {
  QUERY_USERS: gql`
    query QueryUsers($queryString: String) {
      users(queryString: $queryString) {
        _id
        name
        profilePhoto
        currentPage
        currentlyReading {
          title
          coverPhoto
        }
        friends {
          name
        }
        shelves {
          books {
            title
          }
        }
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
};
