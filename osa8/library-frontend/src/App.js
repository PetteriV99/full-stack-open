import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login';

import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import { gql, useQuery } from '@apollo/client'

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

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  if (!authors.data) {
    return <div>no author data</div>
  }

  if (!books.data) {
    return <div>no books data</div>
  }

  return (
    <Router>
    <div>
      <div>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add</Link>
        <Link to="/login">add</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors authors={authors.data.allAuthors}/>} />
        <Route path="/books" element={<Books books={books.data.allBooks}/>} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
