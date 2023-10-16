import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'
import Notification from './Notification'
import NewBlogForm from './NewBlogForm'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'

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
      dispatch(setNotification(`a new blog ${newTitle} by ${newAuthor ? newAuthor : 'unknown author'} was added`, 5))
      setBlogFormVisible(false)
    } catch (error) {
      dispatch(setNotification('title or url is empty', 5))
    }
  }

  const handleLike = async ({ blog }) => {
    try {
      dispatch(likeBlog({ blog }))
    } catch (error) {
      dispatch(setNotification('could not update likes', 5))
    }
  }

  const handleRemove = async ({ blog }) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.user.name || 'unknown'}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (error) {
        dispatch(setNotification('could not remove blog', 5))
      }
    }
  }

  return(
    <div>
      <h2>create new blog</h2>
      <Notification/>
      <div style={hideWhenVisible}>
        <button id='showNewBlogForm' onClick={() => setBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <NewBlogForm createBlog={addBlog} />
        <button id='hideNewBlogForm' onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} ownedByUser={false} />
      )}
    </div>
  )

}

export default Home