import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth'

const userJSON = JSON.parse(localStorage.getItem('loggedBlogappUser'))

const authSlice = createSlice({
  name: 'auth',
  initialState: userJSON ? userJSON : null,
  reducers: {
    setAuth(state, action) {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(action.payload))
      return action.payload
    },
    removeAuth(state) {
      state.user = null
      localStorage.removeItem('loggedBlogappUser')
    }
  }
})

if (userJSON) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${userJSON.token}`
}

export const { setAuth, removeAuth } = authSlice.actions

export const login = ({ username, password }) => {
  return async dispatch => {
    const user = await authService.login({ username, password })
    dispatch(setAuth(user))
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(setAuth(null))
  }
}

export default authSlice.reducer