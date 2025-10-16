const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog is identified by id and not _id', async () => {
  const response = await api.get('/api/blogs')
  assert.ok(response.body[0].id && !response.body[0]._id)
})

describe('adding and deleting blogs as logged in user', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const passwordHash = await bcrypt.hash('password1', 10)

    const user = new User({
      username: 'testuser1',
      name: 'Test User 1',
      passwordHash
    })
    await user.save()

    const response = await api
      .post('/api/login')
      .send({
        username: 'testuser1',
        password: 'password1'
      })

    helper.token = response.body.token
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'John Doe',
      url: 'http://example.com/new-blog',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${helper.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.blogsInDb()

    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1)
    const contents = notesAtEnd.map(n => n.title)
    assert(contents.includes('New Blog'))
  })

  test('when posting a blog and likes are not defined, they default to 0', async () => {

    const newBlog = {
      title: 'Blog without likes',
      author: 'John Doe',
      url: 'http://example.com/blog-without-likes'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${helper.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.blogsInDb()
    const addedBlog = notesAtEnd.find(blog => blog.title === newBlog.title)
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('blog can be deleted', async () => {

    const newBlog = {
      title: 'Blog to be deleted',
      author: 'Test Author',
      url: 'http://example.com/blog-to-delete',
      likes: 0
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${helper.token}`)
      .expect(201)

    const createdBlog = response.body
    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${createdBlog.id}`)
      .set('Authorization', `Bearer ${helper.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    assert(!blogsAtEnd.map(b => b.id).includes(createdBlog.id))
  })
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'John Doe',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const notesAtEnd = await helper.blogsInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length)
})

test('blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlogFromDb = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  assert.strictEqual(updatedBlogFromDb.likes, blogToUpdate.likes + 1)
})

test('user with invalid username cannot be created', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'us',
    name: 'User',
    password: 'pwasd'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

after(async () => {
  await mongoose.connection.close()
})