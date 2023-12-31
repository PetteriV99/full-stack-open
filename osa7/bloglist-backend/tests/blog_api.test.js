const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

let token

beforeAll(async () => {
  token = await helper.getToken()
})

describe('when there is initial helper for blogs', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithManyBlogs)
  })


  describe('blogs can be viewed', () => {

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are as many blogs as in the initial list', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
    })

    test('identifying property is named id', async () => {
      const response = await api.get('/api/blogs')

      response.body.forEach((blog) => {
        expect(blog.id).toBeDefined()
      })
    })
  })

  describe('blogs creation', () => {

    test('new blogs can be added with a POST request', async () => {
      const newBlogObject = helper.listWithOneBlog[0]
      await api
        .post('/api/blogs')
        .send(newBlogObject)
        .set('Authorization', 'Bearer ' + token)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/blogs')
      const contents = response.body.map(r => r.title)

      expect(response.body).toHaveLength(helper.listWithManyBlogs.length + 1)
      expect(contents).toContain(helper.listWithOneBlog[0].title)
    })

    test('new blog post without likes defined will be returned with likes property', async () => {
      const newBlogObject = helper.listWithOneBlog[0]
      newBlogObject.likes = undefined
      const result = await api
        .post('/api/blogs')
        .send(newBlogObject)
        .set('Authorization', 'Bearer ' + token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(result.body.likes).toBeDefined()
      expect(result.body.likes).toBe(0)
    })

    test('new blog post without title or url will not be created', async () => {
      const newBlogObject = helper.listWithOneBlog[0]
      delete newBlogObject.title
      delete newBlogObject.url
      await api
        .post('/api/blogs')
        .send(newBlogObject)
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
    })

    test('new blog post without a valid token will not be created', async () => {
      const newBlogObject = helper.listWithOneBlog[0]
      await api
        .post('/api/blogs')
        .send(newBlogObject)
        .set('Authorization', '')
        .expect(401)
    })

  })

  describe('deletion of a blog', () => {
    test('status code 204 is returned if blog is deleted', async () => {
      const blogsAtStart = await helper.blogInDb()
      const newBlogObject = helper.listWithManyBlogs[0]
      const response = await api
        .post('/api/blogs')
        .send(newBlogObject)
        .set('Authorization', 'Bearer ' + token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      await api.delete(`/api/blogs/${response.body.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(204)
      const blogsAtEnd = await helper.blogInDb()

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    })
    test('status code 401 if blog is not created by user', async () => {
      const blogsAtStart = await helper.blogInDb()
      const blogObject = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogObject.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(401)
      const blogsAtEnd = await helper.blogInDb()

      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
      const titles = blogsAtEnd.map(r => r.title)
      expect(titles).toContain(blogObject.title)

    })
  })

  describe('updating a blog', () => {
    test('status code 200 and result json is returned if blog is updated', async () => {
      const newBlogObject = helper.listWithManyBlogs[0]
      const newBlogPost = await api
        .post('/api/blogs')
        .send(newBlogObject)
        .set('Authorization', 'Bearer ' + token)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      newBlogObject.likes = 14

      const result = await api.put(`/api/blogs/${newBlogPost.body.id}`)
        .send(newBlogObject)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
      expect(result.body.likes).toBe(newBlogObject.likes)

    })
  })


})

afterAll(async () => {
  await mongoose.connection.close()
})