import { useEffect } from 'react'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setLogin, login  } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import Home from './components/Home'
import { Navigate } from 'react-router-dom'

import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,  Routes, Route, Link
} from 'react-router-dom'

//import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.login
  })

  const handeLogin = async ({ username, password }) => {
    try {
      dispatch(login( { username, password } ))
      dispatch(setNotification('logged in', 5))
    } catch (error) {
      dispatch(setNotification('login failed', 5))
    }
  }

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

  return (
    <div>
      <Router>
        <div>
          <Link to="/">home</Link>
          <Link to="/">blogs</Link>
          <Link to="/">users</Link>
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