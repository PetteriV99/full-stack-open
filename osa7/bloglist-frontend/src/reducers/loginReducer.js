import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      //window.localStorage.setItem('loggedBlogappUser', JSON.stringify(action.payload))
      return action.payload
    }
  }
})

export const { setLogin, removeLogin } = loginSlice.actions

export const login = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    dispatch(setLogin(user))
  }
}

export const getLoggedState = (state) => state.login

export const logout = () => {
  return async dispatch => {
    dispatch(setLogin(null))
  }
}

export default loginSlice.reducer