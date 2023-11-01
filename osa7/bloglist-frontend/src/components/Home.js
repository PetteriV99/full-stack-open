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

  return (
    <div className="items-center justify-center px-8 pt-6">
      <h2 className="items-center justify-center px-8 py-6 text-xl font-bold">Add new blogs</h2>
      <div className=" bg-gray-200">
        <div className="w-full list-disc rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <div className="" style={hideWhenVisible}>
            <button id='showNewBlogForm' className=" rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none" onClick={() => setBlogFormVisible(true)}>Create new blog</button>
          </div>
          <div style={showWhenVisible} className="">
            <NewBlogForm createBlog={addBlog} />
            <button id='hideNewBlogForm' className=" mt-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none" onClick={() => setBlogFormVisible(false)}>Cancel</button>
          </div>
        </div>
      </div>
      <h2 className="items-center justify-center px-8 py-6 text-xl font-bold">Blogs</h2>
      <div className="flex min-h-screen bg-gray-200">
        <div className="w-full list-disc rounded bg-white px-8 pb-8 pt-6 shadow-md">
          {blogs.map(blog =>
            <div className="border-b border-gray-200 py-4 hover:bg-gray-100" key={blog.id}>
              <Link className="font-bold text-gray-700" to={`blogs/${blog.id}`}>
                <div className="font-bold text-gray-700">
                  {blog.title} by {blog.author}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home