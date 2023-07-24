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

afterAll(async () => {
  await mongoose.connection.close()
})