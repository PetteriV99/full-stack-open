// Task 5.6

import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ newTitle, newAuthor, newUrl })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div className='mb-2'>
        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="title">
      Title
        </label>
        <input
          id='title'
          type="text"
          value={newTitle}
          name="Title"
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div className='mb-2'>
        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="author">
      Author
        </label>
        <input
          id='author'
          type="text"
          value={newAuthor}
          name="Author"
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div className='mb-2'>
        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="URL">
      URL
        </label>
        <input
          id='url'
          type="text"
          value={newUrl}
          name="Url"
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button className=" mt-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none" id='createBlog' type="submit">Create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default NewBlogForm