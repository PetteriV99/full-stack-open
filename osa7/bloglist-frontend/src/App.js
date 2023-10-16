import { useDispatch, useSelector } from 'react-redux'
import { getLoggedState, login  } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import Home from './components/Home'
import { Navigate } from 'react-router-dom'

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,  Routes, Route, Link
} from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(getLoggedState)

  const handeLogin = async ({ username, password }) => {
    try {
      dispatch(login( { username, password } ))
      dispatch(setNotification('logged in', 5))
    } catch (error) {
      dispatch(setNotification('login failed', 5))
    }
  }

  return (
    <div>
      <Router>
        <div>
          <Notification/>
          <h2>blogs</h2>
          {user ? `${user.name} is logged in` : null}
        </div>
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handeLogin}/>}/>
          <Route path="/" element={user ? <Home /> : <Navigate replace to="/login" />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App