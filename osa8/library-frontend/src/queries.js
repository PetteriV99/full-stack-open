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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export {ALL_AUTHORS, ALL_BOOKS, LOGIN}