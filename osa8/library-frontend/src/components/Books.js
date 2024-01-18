import React from 'react'

const Books = ({books, setFilter }) => {

  if (!books) {
    return (<p>no data</p>)
  }

  const filters = ['history', 'romance', 'horror']

  const handleClick = (genre) => {
    setFilter(genre)
  }

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
          {books.map((a) => (
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
            border: `2px solid`,
          }}
          key={index} onClick={() => handleClick(genre)}>{genre}</button>
        ))}
        <button style={{
            border: `2px solid`,
          }} onClick={() => handleClick('')}>all genres</button>
    </div>
  )
}

export default Books
