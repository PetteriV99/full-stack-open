import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    } }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const addBlog = async (event) => {
    event.preventDefault()
    
    try {
      await blogService.create({'title': newTitle, 'author': newAuthor, 'url': newUrl})
      setSuccessMessage(`a new blog ${newTitle} by ${newAuthor ? newAuthor : 'unknown author'} was added`)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (error) {
      setErrorMessage('title or url is empty')
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
        {LoginForm({handleLogin, username, password, setUsername, setPassword})}
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
      {NewBlogForm({addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl})}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App