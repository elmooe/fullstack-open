const ld = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce(
    (max, blog) => (blog.likes > max.likes ? blog : max),
    blogs[0]
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = ld.countBy(blogs, 'author')
  const maxAuthor = ld.maxBy(
    Object.keys(authorCounts),
    (author) => authorCounts[author]
  )

  const author = {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor],
  }
  return author
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const authors = ld.groupBy(blogs, 'author')
  const likesCountListSortedByAuthor = Object.entries(authors).map(
    ([author, blogs]) => ({
      author,
      likes: blogs.reduce((sum, blog) => sum + blog.likes, 0),
    })
  )
  return ld.maxBy(likesCountListSortedByAuthor, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
