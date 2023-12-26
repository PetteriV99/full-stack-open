import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

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
      title,
      published,
      author,
      id
    }
  }
`

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  if (!authors.data) {
    return <div>no data</div>
  }

  return (
    <Router>
    <div>
      <div>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors authors={authors.data.allAuthors}/>} />
        <Route path="/books" element={<Books books={books.data.allBooks}/>} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
