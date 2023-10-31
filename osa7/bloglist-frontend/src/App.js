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

  return (
    <div>
      <div>
        <div className="bg-gray-800">
          <nav className="flex flex-wrap items-center justify-between p-6">
            <div className="mr-6 flex shrink-0 items-center text-white">
              <span className="text-xl font-semibold tracking-tight">Blogs App</span>
            </div>
            <div className="block lg:hidden">
              <button className="flex items-center rounded border border-gray-400 px-3 py-2 text-gray-200 hover:border-white hover:text-white">
                <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
              </button>
            </div>
            <div className="block w-full grow lg:flex lg:w-auto lg:items-center">
              <div className="text-sm lg:grow">
                <a href="#responsive-header" className="mr-4 mt-4 block text-gray-200 hover:text-white lg:mt-0 lg:inline-block">
                  <Link to="/">Blogs</Link>
                </a>
                <a href="#responsive-header" className="mr-4 mt-4 block text-gray-200 hover:text-white lg:mt-0 lg:inline-block">
                  <Link to="/users">Users</Link>
                </a>
              </div>
              <div>
                <a href="#responsive-header" className="mt-4 block text-gray-200 hover:text-white lg:mt-0 lg:inline-block">
                  {user ? <>
                    <div className="flex flex-wrap items-center justify-between">
                      <em className='mr-3'>{user.name} is logged in</em>
                      <button className='flex items-center rounded border border-gray-400 px-3 py-2 text-gray-200 hover:border-white hover:text-white' onClick={handleLogout}>logout</button>
                    </div>
                  </>: <Link to='/login'>Login</Link>}
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Notification />
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