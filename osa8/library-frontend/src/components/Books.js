import React, { useState } from 'react'

const Books = (props) => {

  const [activeFilter, setActiveFilter] = useState('')

  const books = props.books
  if (!books) {
    return (<p>no data</p>)
  }

  const genresArray = books.map(book => { return book.genres })
  const genres = [].concat(...genresArray)
  const filters = [...new Set(genres)]

  const handleClick = (genre) => {
    if (activeFilter) {
      setActiveFilter('')
    }
    else {
      setActiveFilter(genre)
    }
  }

  const filteredBooks = activeFilter !== '' ? books.filter((book => { return book.genres.includes(activeFilter)})) : books

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filters.map((genre, index) => (
          <button 
          style={{
            backgroundColor: activeFilter === genre ? '#007BFF' : 'transparent',
            color: activeFilter === genre ? '#fff' : '#007BFF',
            border: `2px solid ${activeFilter === genre ? '#007BFF' : '#ccc'}`,
          }}
          key={index} onClick={() => handleClick(genre)}>{genre}</button>
        ))}
    </div>
  )
}

export default Books
