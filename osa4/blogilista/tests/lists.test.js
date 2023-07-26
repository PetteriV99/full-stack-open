const listhelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listhelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listhelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs equals the likes of that', () => {
    const result = listhelper.totalLikes(helper.listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('which blog has most likes', () => {
  test('when list has many blogs the blog with most likes is returned', () => {
    const result = listhelper.favouriteBlog(helper.listWithManyBlogs)
    expect(helper.listWithManyBlogs[2]).toEqual(result)
  })
})

describe('which author has most likes', () => {
  test('object with author with most likes and number of likes is returned', () => {
    const result = listhelper.mostLikes(helper.listWithManyBlogs)
    expect({
      author: 'Edsger W. Dijkstra',
      likes: 17
    }).toEqual(result)
  })
})

describe('which author has most blogs', () => {
  test('object with author with most blogs and number of blogs is returned', () => {
    const result = listhelper.mostBlogs(helper.listWithManyBlogs)
    expect({
      author: 'Robert C. Martin',
      blogs: 3
    }).toEqual(result)
  })
})