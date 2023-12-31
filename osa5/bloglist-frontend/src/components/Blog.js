import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, ownedByUser, handleLike, handleRemove }) => {
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

  const like = () => {
    handleLike({ blog })
  }

  const remove = () => {
    handleRemove( { blog } )
  }


  // There isn't a way to check the id of the current user unless I modify the backend
  const blogUserName = blog.user === null ? 'unknown' : blog.user?.name

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} by {blog.author}
      <button id='showBlogDetails' onClick={toggleVisibility} style={hideWhenVisible}>show</button>
      <button id='hideBlogDetails' onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      <div style={showWhenVisible} className='togglableContent'>
        {blog.url}
        <br/>
        likes {blog.likes} <button id='like' onClick={like}>like</button>
        <br/>
        created by {blogUserName}
        <br/>
        {ownedByUser ? <button id='remove' onClick={remove}>remove</button> : <></>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  ownedByUser: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog