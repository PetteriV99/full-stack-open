const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const listWithOneBlog = [
  {
    _id: '64c6f46e916c880b718adf1a',
    title: 'Jussin blogi',
    author: 'Jussi',
    url: 'google.fi',
    likes: 5,
    user: '64c6f2708c35cd2d1e7663c7',
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '64c6f2708c35cd2d1e7663c7',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '64c6f2708c35cd2d1e7663c7',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '64c6f2708c35cd2d1e7663c7',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '64c6f2708c35cd2d1e7663c7',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '64c6f2708c35cd2d1e7663c7',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '64c6f2708c35cd2d1e7663c7',
    __v: 0
  }
]

const getToken = async () => {
  const login = {
    'username': 'root',
    'password': 'sekret'
  }
  const res = await api.post('/api/login').send(login)
  return res.body.token.toString()
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'removethis' })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  listWithOneBlog,
  listWithManyBlogs,
  nonExistingId,
  blogInDb,
  usersInDb,
  getToken
}