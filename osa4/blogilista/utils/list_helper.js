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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}