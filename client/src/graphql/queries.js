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
    query BookSearch($queryString: String!, $offset: Int!) {
      bookSearch(queryString: $queryString, offset: $offset) {
        _id
        title
        coverPhoto
        rating
        ratingIds
        authors {
          name
        }
      }
    }
  `
};
