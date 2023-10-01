import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: [],
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    removeLogin(state, action) {
      let foundIndex = state.findIndex(login => login.id === action.payload.id)
      state.splice(foundIndex, 1)
    }
  }
})

export const { setLogin, removeLogin } = loginSlice.actions

export const login = (id) => {
  return async dispatch => {
    await loginService.remove(id)
    dispatch(removeLogin(id))
  }
}

export const logout = (id) => {
  return async dispatch => {
    await loginService.remove(id)
    dispatch(removeLogin(id))
  }
}

export default loginSlice.reducer