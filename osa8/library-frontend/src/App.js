import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'

import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import { useQuery, useApolloClient } from '@apollo/client'

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [])

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  if (!authors.data) {
    return <div>no author data</div>
  }

  if (!books.data) {
    return <div>no books data</div>
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
        <Route path="/books" element={<Books books={books.data.allBooks}/>} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommendations" books={books.data.allBooks} element={<Recommendations />} />
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
