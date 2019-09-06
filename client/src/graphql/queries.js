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
        friendIds
        shelves {
          bookIds
        }
      }
    }
  `,
  FETCH_BOOKS: gql`
    query FetchBooks {
      books {
        coverPhoto
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
      reviews{
        user
        book
        content
        hidden
        dateStarted
        dateFinished
        recommendTo
        recommendBy
        privateNotes
        owned
        postToBlog
        addToFeed
        date
      }
    }
  `
};