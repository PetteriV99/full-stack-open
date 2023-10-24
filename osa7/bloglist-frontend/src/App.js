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

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.auth)

  const handeLogin = async ({ username, password }) => {
    try {
      // this is to return a Promise
      await dispatch(login( { username, password } ))
    } catch (error) {
      dispatch(setNotification('login failed', 5))
    }
  }

  const match = useMatch('/users/:id')
  const users = useSelector(state => state.users)
  const otherUser = match ? users.find(user => user.id === match.params.id)
    : null

  const handleLogout = () => dispatch(logout())

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <Notification/>
        <h2>blogs</h2>
        {user ? <>
          <p>{user.name} is logged in</p>
          <button onClick={handleLogout}>logout</button>
        </>: null}
      </div>
      <Routes>
        <Route path="/users/:id" element={<User user={otherUser} />} />
        <Route path="/login" element={<LoginForm onLogin={handeLogin}/>}/>
        <Route path="/" element={user ? <Home /> : <Navigate replace to="/login" />}/>
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
      </Routes>
    </div>
  )
}

export default App