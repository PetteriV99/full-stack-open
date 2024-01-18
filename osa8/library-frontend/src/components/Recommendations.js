import React, { useEffect } from 'react'

const Recommendations = ({books, user, setFilter}) => {

  useEffect(() => {
    if (!user.data.me) {
        setFilter('')
    }
    else {
        setFilter(user.data.me.favoriteGenre)
    }
  }, [setFilter, user.data.me])

  if (!books) {
    return (<p>no book data</p>)
  }

  if (!user.data) {
    return (<p>no user data or user not logged in</p>)
  }

  if (!user.data.me) {
    return (<p>no user data or user not logged in</p>)
  }

  const userFavoriteGenre = user.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {userFavoriteGenre}</p>
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
    </div>
  )
}

export default Recommendations
