const dummy = (blogs) => {
  if (blogs) {
    return 1
  }
  return 0
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => {
    // Can't use += because of eslint :)
    likes = likes + blog.likes
  })
  return likes
}

module.exports = {
  dummy,
  totalLikes
}