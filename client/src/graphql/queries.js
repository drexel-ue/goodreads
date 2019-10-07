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
            rating
          }
        }
      }
    }
  `,
  NON_FRIENDS: gql`
    query NonFriends($queryString: String, $offset: Int!, $userId: ID!) {
      nonFriends(queryString: $queryString, offset: $offset, userId: $userId) {
        _id
        name
        profilePhoto
        currentPage
        currentlyReading {
          _id
          title
          coverPhoto
        }
        friendIds
        shelves {
          bookIds
        }
      }
    }
  `,
  FRIENDS: gql`
    query Friends($queryString: String, $offset: Int!, $userId: ID!) {
      friends(queryString: $queryString, offset: $offset, userId: $userId) {
        _id
        name
        profilePhoto
        currentPage
        currentlyReading {
          _id
          title
          coverPhoto
        }
        friendIds
        shelves {
          bookIds
        }
      }
    }
  `,
  MAYBE_FRIENDS: gql`
    query MaybeFriends($userId: ID!) {
      maybeFriends(userId: $userId) {
        _id
        name
        profilePhoto
        friendIds
        shelves {
          bookIds
        }
      }
    }
  `,
  FRIEND_IDS: gql`
    query FriendIds($userId: ID!) {
      friendIds(userId: $userId)
    }
  `,
  FETCH_BOOKS: gql`
    query FetchBooks {
      books {
        _id
        coverPhoto
        publishDate
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
      _id @client
    }
  `,
  CACHED_USER: gql`
    query WhoDis {
      user {
        name @client
      }
    }
  `,
  BOOK_BY_ID: gql`
    query BookById($_id: ID!) {
      book(_id: $_id) {
        _id
        title
        coverPhoto
        coverType
        description
        publishDate
        publisher
        edition
        pages
        isbn
        genres
        settings
        rating
        ratingIds
        series
        authors {
          name
          _id
          followerIds
          bookIds
          profilePhoto
          bio
        }
        characters {
          name
          _id
        }
      }
    }
  `,
  BOOKS_BY_GENRE: gql`
    query BooksByGenre($genreString: String) {
      booksByGenre(genreString: $genreString) {
        _id
        title
        description
        coverPhoto
        publishDate
        authors {
          name
        }
        ratings {
          stars
        }
      }
    }
  `,
  BOOKS_BY_GENRE_SHOW: gql`
    query BooksByGenreSHOW($genreString: String) {
      booksByGenreShow(genreString: $genreString) {
        _id
        title
        description
        coverPhoto
        authors {
          name
        }
        ratings {
          stars
        }
      }
    }
  `,
  FETCH_REVIEWS: gql`
    query FetchReviews {
      reviews {
        user {
          name
        }
        book {
          title
        }
        content
        hidden
        recommendTo
        privateNotes
        owned
        postToBlog
        addToFeed
      }
    }
  `,
  FETCH_REVIEWS_BY_BOOK: gql`
    query FetchReviewsByBookId($bookId: ID!) {
      reviewByBookId(bookId: $bookId) {
        user {
          _id
          name
          profilePhoto
        }
        book {
          title
        }
        content
        hidden
        recommendTo
        privateNotes
        owned
        postToBlog
        addToFeed
        date
      }
    }
  `,
  BOOKS_BY_SERIES: gql`
    query BooksBySeries($series: String!) {
      booksBySeries(series: $series) {
        _id
        title
        description
        coverPhoto
        series
        authors {
          name
        }
        rating
      }
    }
  `,
  BOOKS_BY_AUTHOR: gql`
    query BooksByAuthor($_id: ID!) {
      booksByAuthor(_id: $_id) {
        _id
        title
        description
        coverPhoto
        series
        rating
      }
    }
  `,
  SHELVES_BY_USER: gql`
    query ShelvesByUser($_id: ID!) {
      shelvesByUser(_id: $_id) {
        _id
        name
        bookIds
      }
    }
  `,
  BOOK_SEARCH: gql`
    query BookSearch($queryString: String!, $offset: Int!, $limit: Int!) {
      bookSearch(queryString: $queryString, offset: $offset, limit: $limit) {
        _id
        title
        coverPhoto
        publishDate
        rating
        ratingIds
        authors {
          name
        }
      }
    }
  `,
  RATED_BY_USER: gql`
    query RatedByUser($bookId: ID!, $userId: ID!) {
      ratedByUser(bookId: $bookId, userId: $userId)
    }
  `
};
