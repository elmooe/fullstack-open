import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

test('form calls createBlog callback with correct data when blog is created', async () => {
  const user = userEvent.setup()
  const mockCreateBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={mockCreateBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const createButton = container.querySelector('button[type="submit"]')

  await user.type(titleInput, 'Test title')
  await user.type(authorInput, 'John Doe')
  await user.type(urlInput, 'https://example.com/testing')

  await user.click(createButton)

  expect(mockCreateBlog).toHaveBeenCalledTimes(1)
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'Test title',
    author: 'John Doe',
    url: 'https://example.com/testing',
  })
})
