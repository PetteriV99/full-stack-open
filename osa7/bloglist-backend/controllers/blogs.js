const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'missing title or url'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
    comments: []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  if ( blog.user.toString() === user._id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else {
    response.status(401).json({ error: 'blog not created by user' })
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const oldBlog = await Blog.findById(request.params.id)
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  if ( oldBlog.user.toString() === user._id.toString() ) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.status(200).json(updatedBlog)
  }
  else if (newBlog.likes >= oldBlog.likes) {
    // It is still flawed to trust frontend for the number of likes
    const likedBlog = {
      title: oldBlog.title,
      author: oldBlog.author,
      url: oldBlog.url,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, likedBlog, { new: true })
    response.status(200).json(updatedBlog)
  }
  else {
    response.status(401).json({ error: 'blog not created by user' })
  }
})

blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'missing comment content'
    })
  }

  const blogForComment = await Blog.findById(request.params.id)

  if (!blogForComment) {
    return response.status(404).end()
  }

  const comment = new Comment({
    content: body.content,
    blog: blogForComment._id,
  })

  const savedComment = await comment.save()
  blogForComment.comments = blogForComment.comments.concat(savedComment._id)
  await blogForComment.save()
  response.status(201).json(savedComment)

})

module.exports = blogsRouter