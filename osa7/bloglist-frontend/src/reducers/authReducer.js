import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth'
import blogService from '../services/blogs'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setAuth(state, action) {
      //window.localStorage.setItem('loggedBlogappUser', JSON.stringify(action.payload))
      return action.payload
    }
  }
})

export const { setAuth, removeAuth } = authSlice.actions

export const login = ({ username, password }) => {
  return async dispatch => {
    const user = await authService.login({ username, password })
    blogService.setToken(user.token)
    dispatch(setAuth(user))
  }
}

export const getLoggedState = (state) => state.auth

export const logout = () => {
  return async dispatch => {
    dispatch(setAuth(null))
  }
}

export default authSlice.reducer