import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [user, setUser] = useState(null)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({username, password}) => {

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const logOut = () => (
    <button onClick={handleLogout}>Logout</button>
  )

  const createBlog = async ({ newTitle, newAuthor, newUrl }) => {
    try {
      const newBlog = await blogService.create({ 'title': newTitle, 'author': newAuthor, 'url': newUrl })
      newBlog.user = user
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(`a new blog ${newTitle} by ${newAuthor ? newAuthor : 'unknown author'} was added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setBlogFormVisible(false)
    } catch (error) {
      setErrorMessage('title or url is empty')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async({ blog }) => {
    const blogToUpdate = { ...blog }
    blogToUpdate.likes = blogToUpdate.likes + 1
    const updatedBlogsArray = blogs.map((existingBlog) => {
      if (existingBlog.id === blogToUpdate.id) {
        return blogToUpdate;
      } else {
        return existingBlog;
      }
    });
    setBlogs(updatedBlogsArray)
    try {
      const updatedBlog = await blogService.update(blog.id, blogToUpdate)
      setBlogs((prevBlogs) => prevBlogs.map((existingBlog) => {
        if (existingBlog.id === updatedBlog.id) {
          return updatedBlog;
        } else {
          return existingBlog;
        }
      }));
    } catch (error) {
      setErrorMessage('could not update likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification type={'error'} message={errorMessage} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in {logOut()}</p>
      <h2>create new blog</h2>
      <Notification type={'error'} message={errorMessage} />
      <Notification type={'success'} message={successMessage} />
      <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <NewBlogForm createBlog={createBlog} />
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      )}
    </div>
  )
}

export default App