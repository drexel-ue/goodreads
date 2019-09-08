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
  CREATE_REVIEW: gql`
 mutation CreateReview(
    $user: ID!,
    $book: ID!,
    $content: String!,
    $hidden: Boolean!,
    $recommendTo: String!,
    $privateNotes: String!,
    $owned: Boolean!,
    $postToBlog: Boolean!,
    $addToFeed: Boolean!,
 ){
  	createReview(
      user: $user, 
      book: $book,
      content: $content,
  		hidden: $hidden,
      recommendTo: $recommendTo,
      privateNotes: $privateNotes,
      owned: $owned,
      postToBlog: $postToBlog,
      addToFeed: $addToFeed,
    ){
        user
        book
        content
        hidden
        recommendTo
        privateNotes
        owned
        postToBlog
        addToFeed
      }
    }
  `
};
