import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const Blog = ({ blog }) => {

  const user = useSelector(state => state.auth)

  if (!blog) {
    return(<p>No blog data</p>)
  }

  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const handleLike = async () => {
    try {
      dispatch(likeBlog({ blog }))
    } catch (error) {
      dispatch(setNotification('Could not update likes', 5))
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.user.name || 'unknown'}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (error) {
        dispatch(setNotification('Could not remove blog', 5))
      }
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog(blog.id, comment))
    } catch (error) {
      dispatch(setNotification('Could not add comment', 5))
    }
  }

  return (
    <div className="items-center justify-center px-8 pt-6">
      <h2 className="items-center justify-center px-8 py-6 text-xl font-bold">{blog.title} by {blog.author}</h2>
      <h3 className="items-center justify-center px-8 py-2 text-lg font-bold">{blog.url}</h3>
      <h3 className="items-center justify-center px-8 py-2 text-lg font-bold">This blogs like count is {blog.likes}</h3>
      <div className="flex min-h-screen bg-gray-200">
        <div className="w-full list-disc rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <div key={user.name} className=" py-4">
            <button className=" mr-3 mt-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none" id='like' onClick={handleLike}>Like</button>
            {user.username === blog.user?.username ? <button className=" my-3 mt-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none" id='remove' onClick={handleRemove}>Remove blog</button> : null}
            <form onSubmit={handleComment}>
              <div className='mb-2 py-4'>
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="content">
                Add a comment
                </label>
                <input
                  id='comment'
                  type="text"
                  value={comment}
                  name="comment"
                  className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                  onChange={({ target }) => setComment(target.value)}
                />
              </div>
              <button className=" mt-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none" id='createComment' type="submit">Comment</button>
            </form>
            <h3 className="py-6 text-lg font-bold">Comments</h3>
            <div>
              {blog.comments.map(comment =>
                <div className="border-b border-gray-200 py-4" key={comment.id}>
                  <div className="font-bold text-gray-700">
                    {comment.content}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

/*
  return (
    <div>
      <h1>{blog.title} by {blog.author}</h1>
      {blog.url}
      <br/>
      likes {blog.likes} <button id='like' onClick={handleLike}>like</button>
      <br/>
      created by {blog.author}
      <br/>
      {user.username === blog.user?.username ? <button id='remove' onClick={handleRemove}>remove</button> : null}
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
*/
}

export default Blog