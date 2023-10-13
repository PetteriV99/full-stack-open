import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    removeLogin() {
      return null
    }
  }
})

export const { setLogin, removeLogin } = loginSlice.actions

export const login = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login(username, password)
    console.log(user)
    dispatch(setLogin(user))
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(removeLogin())
  }
}

export default loginSlice.reducer