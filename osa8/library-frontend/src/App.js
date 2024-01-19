import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'

import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import { useQuery, useApolloClient } from '@apollo/client'

const App = () => {
  const [genreToFilter, setGenreToFilter] = useState(null)
  //const [authorToFilter, setAuthorToFilter] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS, {
    variables: { genreToFilter }
  })
  const user = useQuery(ME)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [])

  if (authors.loading)  {
    return <div>loading...</div>
  }

  if (!authors.data) {
    return <div>no author data</div>
  }

  if (books.loading)  {
    return <div>loading...</div>
  }

  if (!books.data) {
    return <div>no book data</div>
  }

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  return (
    <Router>
    <div>
      <div className='nav'>
        <Link style={linkButtonStyle} to="/">authors</Link>
        <Link style={linkButtonStyle} to="/books">books</Link>
        {token ? <Link style={linkButtonStyle} to="/add">add books</Link> : null}
        {token ? <Link style={linkButtonStyle} to="/recommendations">recommend</Link> : null}
        {token ? <button style={linkButtonStyle} onClick={logout}>logout</button> : <Link style={linkButtonStyle} to="/login">login</Link>}
      </div>
      <Routes>
        <Route path="/" element={<Authors authors={authors.data.allAuthors}/>} />
        <Route path="/books" element={<Books books={books.data.allBooks} setFilter={setGenreToFilter}/>} />
        <Route path="/add" element={<NewBook filter={genreToFilter}/>} />
        <Route path="/recommendations" element={<Recommendations books={books.data.allBooks} user={user} setFilter={setGenreToFilter} />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
      </Routes>
    </div>
    </Router>
  )
}

const linkButtonStyle = {
  textDecoration: 'none',
  padding: '1px 2px',
  background: '#fff',
  border: 'none',
  cursor: 'pointer',
  marginRight: '10px',
  display: 'inline-block',
  textAlign: 'center',
}

export default App
