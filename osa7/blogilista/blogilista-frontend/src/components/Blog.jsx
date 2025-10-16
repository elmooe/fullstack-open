import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import CommentForm from './CommentForm'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`

const Card = styled.article`
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`

const Title = styled.h1`
  color: #1f2937;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;
`

const Url = styled.div`
  margin-bottom: 20px;
`

const Link = styled.a`
  color: #3b82f6;
  text-decoration: none;
  border: 1px solid #e1e5e9;
  padding: 8px 12px;
  border-radius: 6px;

  &:hover {
    background-color: #f8fafc;
  }
`

const MetaData = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px 0;
  border-top: 1px solid #f3f4f6;
  border-bottom: 1px solid #f3f4f6;
`

const Likes = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const LikesCount = styled.span`
  color: #374151;
  font-weight: 600;
  font-size: 16px;
`

const LikeButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0eaa76ff;
  }
`

const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background: #dc2626;
  }
`

const CommentsTitle = styled.h2`
  color: #1f2937;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`

const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
`

const Comment = styled.li`
  background: #f8fafc;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  color: #374151;
  font-size: 15px;
  position: relative;
`

const Blog = ({ updateBlog, deleteBlog, user, addComment }) => {
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

  if (!blog) {
    return <p>Loading...</p>
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  const handleAddComment = async (comment) => {
    await addComment(blog.id, comment)
  }

  return (
    <Container>
      <Card>
        <Title>{blog.title}</Title>

        <Url>
          <Link href={blog.url} target="_blank">
            Visit Blog
          </Link>
        </Url>

        <MetaData>
          <Likes>
            <LikesCount>{blog.likes} likes</LikesCount>
            <LikeButton onClick={handleLike}>Like</LikeButton>
          </Likes>

          <p>Added by {blog.user?.name}</p>

          {user && blog.user && user.username === blog.user.username && (
            <RemoveButton onClick={handleDelete}>Remove Blog</RemoveButton>
          )}
        </MetaData>
      </Card>

      <CommentsTitle>Comments</CommentsTitle>

      {blog.comments && blog.comments.length > 0 ? (
        <CommentsList>
          {blog.comments.map((comment, index) => (
            <Comment key={index}>{comment}</Comment>
          ))}
        </CommentsList>
      ) : (
        <p>No comments yet.</p>
      )}

      <CommentForm createComment={handleAddComment} />
    </Container>
  )
}

export default Blog
