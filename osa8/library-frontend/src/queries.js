import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount,
      id
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      genres
      id
      published
      title
      author {
        id
        name
        born
        bookCount
      }
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: String!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      id
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      id
      author {
        name
        id
        born
        bookCount
      }
      published
      genres
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export {ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR, CREATE_BOOK, LOGIN}