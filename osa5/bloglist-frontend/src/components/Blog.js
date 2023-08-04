import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
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

  const remove = (event) => {
    event.preventDefault()
    handleRemove( { blog } )
  }

  const userName = blog.user === null ? 'unknown' : blog.user.name
  const userId = user === null ? '' : user.id
  const blogUserId = blog.user === null ? '' : blog.user.id

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
        created by {userName}
        <br/>
        {userId === blogUserId ? <button onClick={remove}>remove</button> : <></>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog