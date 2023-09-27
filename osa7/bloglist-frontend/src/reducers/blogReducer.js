import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      let foundIndex = state.findIndex(blog => blog.id === action.payload.id)
      state.splice(foundIndex, 1, action.payload)
    }
  }
})

export const { appendBlog, setBlogs, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = params => {
  return async dispatch => {
    const newAnecdote = await blogService.create(params)
    dispatch(appendBlog(newAnecdote))
  }
}

export default blogSlice.reducer