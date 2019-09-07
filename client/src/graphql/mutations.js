import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        isLoggedIn
        name
        _id
        profilePhoto
        email
        currentPage
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($email: String!, $password: String!, $name: String!) {
      register(email: $email, password: $password, name: $name) {
        token
        isLoggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        isLoggedIn
        name
        _id
        profilePhoto
        email
        currentPage
      }
    }
  `,
  ADD_TO_SHELF: gql`
    mutation AddToShelf($shelfId: ID!, $bookId: ID!) {
      addShelfBook(shelfId: $shelfId, bookId: $bookId) {
        _id
        name
        bookIds
      }
    }
  `
};
