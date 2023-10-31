import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    createNotification(state, action) {
      state.push({
        message: action.payload.message,
        type: action.payload.type
      })
    },
    removeNotification(state) {
      state.pop()
      return state
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, time, type) => {
  return dispatch => {
    dispatch(createNotification({ message: message, type: type }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer