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
    },
    removeBlog(state, action) {
      let foundIndex = state.findIndex(blog => blog.id === action.payload.id)
      state.splice(foundIndex, 1)
    },
    updateComment(state, action) {
      let foundIndex = state.findIndex(blog => blog.id === action.payload.blog)
      let blogToUpdate = state[foundIndex]
      blogToUpdate.comments.push(action.payload)
      state.splice(foundIndex, 1, blogToUpdate)
    }
  }
})

export const { appendBlog, setBlogs, updateBlog, removeBlog, updateComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = params => {
  return async dispatch => {
    const newAnecdote = await blogService.create(params)
    console.log(newAnecdote)
    dispatch(appendBlog(newAnecdote))
  }
}

export const likeBlog = ( { blog }) => {
  return async dispatch => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(blog.id, updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const commentBlog = (id, content) => {
  return async dispatch => {
    const commentedBlog = await blogService.createComment(id, content)
    dispatch(updateComment(commentedBlog))
  }
}

export default blogSlice.reducer