import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, CREATE_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(0)
  const [bookGenre, setBookGenre] = useState('')
  const [genres, setGenres] = useState([])
  const genreToFilter = props.filter

  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error)
    },
    update: (cache, { data: { createBook } }) => {
      const data = cache.readQuery({ query: ALL_BOOKS, variables: { genreToFilter } })
      const newBooks = [...data.allBooks, createBook];
      cache.writeQuery({ query: ALL_BOOKS , data: { allBooks: newBooks}})
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published: Number(published), genres }})

    setTitle('')
    setPublished(0)
    setAuthor('')
    setGenres([])
    setBookGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(bookGenre))
    setBookGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={bookGenre}
            onChange={({ target }) => setBookGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook