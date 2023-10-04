import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setLogin } from './reducers/loginReducer'

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,  Routes, Route, Link, useNavigate
} from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => {
    return state.blogs.toSorted((a, b) => b.likes - a.likes)
  })

  const user = null

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLogin(user))
    } catch (error) {
      dispatch(setNotification('wrong credentials', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setLogin(null))
  }

  const logOut = () => (
    <button id='logout' onClick={handleLogout}>Logout</button>
  )

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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in {logOut()}</p>
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
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} ownedByUser={user?.name === blog?.user?.name ? true : false} />
      )}
    </div>
  )
}

export default App