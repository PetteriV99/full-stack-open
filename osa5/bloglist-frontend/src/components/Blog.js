import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    event.preventDefault()
    handleLike({ blog })
  }

  const user = blog.user === null ? 'unknown' : blog.user.name

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={toggleVisibility} style={hideWhenVisible}>show</button>
      <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br/>
        likes {blog.likes} <button onClick={like}>like</button>
        <br/>
        created by {user}
      </div>
    </div>
  )
}

export default Blog