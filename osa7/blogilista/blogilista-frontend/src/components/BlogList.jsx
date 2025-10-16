import { useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`

const PageTitle = styled.h2`
  margin-bottom: 24px;
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 30px;
`

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`

const Title = styled.h3`
  line-height: 1.4;
`

const Author = styled.p`
  margin: 0;
`

const MetaData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
`

const Likes = styled.span`
  color: #10b981;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`

const BlogList = ({ addBlog }) => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  const handleAddBlog = async (blogObject) => {
    await addBlog(blogObject)
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Container>
      <PageTitle>Blog App</PageTitle>
      <Togglable buttonLabel="Create new" ref={blogFormRef}>
        <BlogForm createBlog={handleAddBlog} />
      </Togglable>
      <Grid>
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <Title>{blog.title}</Title>
              <Author>by {blog.author}</Author>
              <MetaData>
                <Likes>{blog.likes} likes</Likes>
                <span>{blog.comments?.length || 0} comments</span>
              </MetaData>
            </Link>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}

export default BlogList
