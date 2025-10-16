import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

test('renders blog title and author', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText(/Test Blog/i)
  const authorElement = screen.getByText(/Test Author/i)

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
})

test('shows blog url and likes when view button is clicked', () => {
  const user = userEvent.setup()
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testblog.com',
    likes: 5,
  }

  render(<Blog blog={blog} />)

  const viewButton = screen.getByText(/view/i)
  user.click(viewButton)

  const urlElement = screen.getByText(/https:\/\/testblog.com/i)
  const likesElement = screen.getByText(/likes 5/i)

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('if like button is clicked twice, the event handler is called twice', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testblog.com',
    likes: 5,
  }

  const mockHandler = vi.fn()
  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const viewButton = screen.getByText(/view/i)
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})
