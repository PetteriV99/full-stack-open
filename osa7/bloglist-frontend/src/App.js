import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => {
    return state.blogs.toSorted((a, b) => b.likes - a.likes)
  })

  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [user, setUser] = useState(null)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      setUser(user)
    } catch (error) {
      dispatch(setNotification('wrong credentials', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, updatedBlog)

      /*const updatedBlogsArray = blogs
        .map(existingBlog => (existingBlog.id === blog.id ? updatedBlog : existingBlog))
        .sort((a, b) => b.likes - a.likes)
      */
      //setBlogs(updatedBlogsArray)
    } catch (error) {
      dispatch(setNotification('could not update likes', 5))
    }
  }

  const handleRemove = async ({ blog }) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.user.name || 'unknown'}?`)) {
      try {
        console.log(blog.id)
        await blogService.remove(blog.id)
        //setBlogs(blogs.filter((element) => element.id !== blog.id))
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