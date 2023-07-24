const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const data = require('./data')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(data.listWithOneBlog[0])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are as many blogs as in the initial list', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(data.listWithOneBlog.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})