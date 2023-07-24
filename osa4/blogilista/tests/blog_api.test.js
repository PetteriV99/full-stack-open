const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const data = require('./data')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of data.listWithManyBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are as many blogs as in the initial list', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(data.listWithManyBlogs.length)
})

test('identifying property is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('new blogs can be added with a POST request', async () => {
  const newBlogObject = data.listWithOneBlog[0]
  await api
    .post('/api/blogs')
    .send(newBlogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(data.listWithManyBlogs.length + 1)
  expect(contents).toContain(data.listWithOneBlog[0].title)
})

test('new blog post without likes defined will be returned with likes property', async () => {
  const newBlogObject = data.listWithOneBlog[0]
  newBlogObject.likes = undefined
  const result = await api
    .post('/api/blogs')
    .send(newBlogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  console.log(result.body)

  expect(result.body.likes).toBeDefined()
  expect(result.body.likes).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})