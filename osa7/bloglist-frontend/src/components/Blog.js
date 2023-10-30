import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const Blog = ({ blog }) => {

  if (!blog) {
    return(<p>no blog data</p>)
  }

  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const handleLike = async () => {
    try {
      dispatch(likeBlog({ blog }))
    } catch (error) {
      dispatch(setNotification('could not update likes', 5))
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.user.name || 'unknown'}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (error) {
        dispatch(setNotification('could not remove blog', 5))
      }
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog(blog.id, comment))
    } catch (error) {
      dispatch(setNotification('could not add comment', 5))
    }
  }

  return (
    <div>
      <h1>{blog.title} by {blog.author}</h1>
      {blog.url}
      <br/>
      likes {blog.likes} <button id='like' onClick={handleLike}>like</button>
      <br/>
      created by {blog.author}
      <br/>
      <button id='remove' onClick={handleRemove}>remove</button>
      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <input type="text"  onChange={({ target }) => setComment(target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog