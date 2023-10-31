import { useDispatch, useSelector } from 'react-redux'
import { login, logout  } from './reducers/authReducer'
import { setNotification } from './reducers/notificationReducer'
import Home from './components/Home'
import { Navigate, useMatch } from 'react-router-dom'

import {
  Routes, Route, Link
} from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.auth)

  const handeLogin = async ({ username, password }) => {
    try {
      // this is to return a Promise
      await dispatch(login( { username, password } ))
      dispatch(setNotification('logged in', 5))
    } catch (error) {
      dispatch(setNotification('login failed', 5))
    }
  }

  const blogs = useSelector(state => state.blogs)

  const matchBlogs = useMatch('/blogs/:id')
  const matchUsers = useMatch('/users/:id')

  const users = useSelector(state => state.users)
  const otherUser = matchUsers ? users.find(user => user.id === matchUsers.params.id)
    : null

  const blog = matchBlogs ? blogs.find(blog => blog.id === matchBlogs.params.id) : null

  const handleLogout = () => dispatch(logout())

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div style={{ backgroundColor: 'LightGray' }}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user ? <>
          <em style={padding}>{user.name} is logged in</em>
          <button onClick={handleLogout}>logout</button>
        </>: null}
      </div>
      <Notification />
      <h2 className="text-3xl font-bold underline">blogs app</h2>
      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blog}></Blog>}></Route>
        <Route path="/users/:id" element={<User user={otherUser} />} />
        <Route path="/login" element={<LoginForm onLogin={handeLogin}/>}/>
        <Route path="/" element={user ? <Home /> : <Navigate replace to="/login" />}/>
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
      </Routes>
    </div>
  )
}

export default App