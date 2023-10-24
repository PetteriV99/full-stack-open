import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {

  if (!blog) {
    return(<p>no blog data</p>)
  }

  const dispatch = useDispatch()

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
    </div>
  )
}

export default Blog