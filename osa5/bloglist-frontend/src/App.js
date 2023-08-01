import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
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

  const newBlogForm = () => (
    <form onSubmit={addBlog}>
    <div>
      title:
      <input
        type="text"
        value={newTitle}
        name="Title"
        onChange={({ target }) => setNewTitle(target.value)}
      />
    </div>
    <div>
      author:
      <input
        type="text"
        value={newAuthor}
        name="Author"
        onChange={({ target }) => setNewAuthor(target.value)}
      />
    </div>
    <div>
      url:
      <input
        type="text"
        value={newUrl}
        name="Url"
        onChange={({ target }) => setNewUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification type={'error'} message={errorMessage} />
        {loginForm()}
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
      {newBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App