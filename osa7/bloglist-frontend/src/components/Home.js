import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import NewBlogForm from './NewBlogForm'
import { Link } from 'react-router-dom'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog  } from '../reducers/blogReducer'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const addBlog = async ({ newTitle, newAuthor, newUrl }) => {
    try {
      dispatch(createBlog({ 'title': newTitle, 'author': newAuthor, 'url': newUrl }))
      dispatch(setNotification(`a new blog ${newTitle} by ${newAuthor ? newAuthor : 'unknown author'} was added`, 5, 'success'))
      setBlogFormVisible(false)
    } catch (error) {
      dispatch(setNotification('title or url is empty', 5, 'error'))
    }
  }

  return(
    <div>
      <div className="items-center justify-center px-8 pt-6" style={hideWhenVisible}>
        <button id='showNewBlogForm' className=" rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none" onClick={() => setBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible} className="items-center justify-center px-8 pt-6">
        <NewBlogForm createBlog={addBlog} />
        <button id='hideNewBlogForm' className=" mt-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none" onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
      <div className="flex min-h-screen bg-gray-200">
        <div className="w-full list-disc rounded bg-white px-8 pb-8 pt-6 shadow-md">
          {blogs.map(blog =>
            <div className="border-b border-gray-200 py-4" key={blog.id}>
              <Link className="font-bold text-gray-700" to={`blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )

}

export default Home