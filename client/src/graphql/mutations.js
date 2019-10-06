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
  `,
  LEAVE_RATING: gql`
    mutation LeaveRating($bookId: ID!, $userId: ID!, $stars: Int!) {
      leaveRating(bookId: $bookId, userId: $userId, stars: $stars) {
        _id
        rating
        ratingIds
        ratings {
          stars
          user {
            _id
          }
        }
      }
    }
  `,
  CREATE_REVIEW: gql`
    mutation CreateReview(
      $user: ID!
      $book: ID!
      $content: String
      $hidden: Boolean
      # $dateStarted: DateTime
      # $dateFinished: DateTime
      $recommendTo: String
      # $recommendBy: ID
      $privateNotes: String
      $owned: Boolean
      $postToBlog: Boolean
      $addToFeed: Boolean # $date: DateTime!
    ) {
      createReview(
        user: $user
        book: $book
        content: $content
        hidden: $hidden
        # dateStarted: $dateStarted
        # dateFinished: $dateFinished
        recommendTo: $recommendTo
        # recommendBy: $recommendBy
        privateNotes: $privateNotes
        owned: $owned
        postToBlog: $postToBlog
        addToFeed: $addToFeed # date: $date
      ) {
        user {
          name
        }
        book {
          title
        }
        content
        hidden
        # dateStarted
        # dateFinished
        recommendTo
        # recommendBy
        privateNotes
        owned
        postToBlog
        addToFeed
        date
      }
    }
  `,
  BE_UN_FRIEND: gql`
    mutation BeUnFriend($myId: ID!, $theirId: ID!, $requestType: String!) {
      beUnFriend(myId: $myId, theirId: $theirId, requestType: $requestType) {
        _id
        friendIds
      }
    }
  `
};
