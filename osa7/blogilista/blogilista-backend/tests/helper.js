const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author 1',
    url: 'https://example.com/first-blog',
    likes: 5,
  },
  {
    title: 'Second Blog',
    author: 'Author 2',
    url: 'https://example.com/second-blog',
    likes: 10,
  },
]

const token = ''

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  token,
  blogsInDb,
  usersInDb,
}
