const dummy = (blogs) => {
  if (blogs) {
    return 1
  }
  return 0
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((mostLikedBlog, currentBlog) => {
    return currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog
  })
}

const mostBlogs = (blogs) => {
  const authors = []
  blogs.forEach(blog => {
    if (!authors.some(e => e.author === blog.author)) {
      let object = { author: blog.author, blogs: 1 }
      authors.push(object)
    }
    else {
      let objectToReplace = authors.find(e => e.author === blog.author)
      Object.assign(objectToReplace, { author: blog.author, blogs: objectToReplace.blogs + 1 })
    }
  })
  return authors.reduce((mostBlogs, currentBlog) => {
    return currentBlog.blogs > mostBlogs.blogs ? currentBlog : mostBlogs
  })
}

const mostLikes = (blogs) => {
  let authors = []
  blogs.map(blog => {
    if (!authors.some(e => e.author === blog.author)) {
      let object = { author: blog.author, likes:blog.likes }
      authors.push(object)
    }
    else {
      let objectToReplace = authors.find(e => e.author === blog.author)
      Object.assign(objectToReplace, { author: blog.author, likes: objectToReplace.likes + blog.likes })
    }
  })
  return authors.reduce((mostLikedAuthor, currentBlog) => {
    return currentBlog.likes > mostLikedAuthor.likes ? currentBlog : mostLikedAuthor
  })
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostLikes,
  mostBlogs
}