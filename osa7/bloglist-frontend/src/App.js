import { useDispatch, useSelector } from 'react-redux'
import { getLoggedState, login, logout  } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import Home from './components/Home'

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,  Routes, Route, Link
} from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(getLoggedState)

  const handeLogin = async ({ username, password }) => {
    try {
      dispatch(login( { username, password } ))
    } catch (error) {
      dispatch(setNotification('login failed', 5))
    }
  }

  const handleLogout = () => dispatch(logout())

  return (
    <div>
      <Router>
        <div>
          <Notification/>
          <h2>blogs</h2>
          {user ? <>
            <p>{user.name} is logged in</p>
            <button onClick={handleLogout}>logout</button>
          </>: null}
        </div>
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handeLogin}/>}/>
          <Route path="/" element={<Home />}/>
          <Route path="/users" element={<Users/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App