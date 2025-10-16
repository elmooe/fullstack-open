import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.form`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  align-items: flex-start;
`

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
`

const Button = styled.button`
  background: #0cbf84ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);

  &:disabled {
    background: #9ca3af;
  }
`

const CommentForm = ({ createComment }) => {
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    if (comment.trim()) {
      createComment(comment)
      setComment('')
    }
  }

  return (
    <Container onSubmit={addComment}>
      <Input
        type="text"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Add a comment..."
        required
      />
      <Button type="submit" disabled={!comment.trim()}>
        Add Comment
      </Button>
    </Container>
  )
}

export default CommentForm
