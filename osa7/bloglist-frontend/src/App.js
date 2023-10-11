import { useEffect } from 'react'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setLogin } from './reducers/loginReducer'
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
          <Route path="/login" element={<LoginForm onLogin={user}/>}/>
          <Route path="/" element={user ? <Home /> : <Navigate replace to="/login" />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App