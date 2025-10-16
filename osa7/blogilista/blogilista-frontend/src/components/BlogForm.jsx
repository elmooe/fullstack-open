import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.form`
  max-width: 500px;
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  margin: 0 auto;
`

const Group = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background-color: #ffffff;
  box-sizing: border-box;

  &:hover {
    border-color: #9ca3af;
  }
`

const SubmitButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0eaa76ff;
  }
`

const FormTitle = styled.h2`
  text-align: center;
`

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <Container onSubmit={addBlog}>
      <FormTitle>Create New Blog</FormTitle>

      <Group>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter blog title"
          value={newBlog.title}
          onChange={(event) =>
            setNewBlog({ ...newBlog, title: event.target.value })
          }
          name="title"
          required
        />
      </Group>

      <Group>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          type="text"
          placeholder="Enter author name"
          value={newBlog.author}
          onChange={(event) =>
            setNewBlog({ ...newBlog, author: event.target.value })
          }
          name="author"
          required
        />
      </Group>

      <Group>
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="text"
          placeholder="Enter blog URL"
          value={newBlog.url}
          onChange={(event) =>
            setNewBlog({ ...newBlog, url: event.target.value })
          }
          name="url"
        />
      </Group>

      <SubmitButton type="submit">Create Blog</SubmitButton>
    </Container>
  )
}

export default BlogForm
