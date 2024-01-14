import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'

import React, { useState } from 'react'

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
      <div>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        {token 
        ? 
        <div>
            <Link to="/add">add books</Link>
            <button onClick={logout}>logout</button> 
        </div>
        : 
        <Link to="/login">login</Link>}
      </div>

      <Routes>
        <Route path="/" element={<Authors authors={authors.data.allAuthors}/>} />
        <Route path="/books" element={<Books books={books.data.allBooks}/>} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
