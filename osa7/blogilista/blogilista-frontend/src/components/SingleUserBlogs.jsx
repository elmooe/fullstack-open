import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`

const UserName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const BlogAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Blogs = styled.section`
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`

const BlogsTitle = styled.h2`
  margin: 0;
  padding: 24px 32px;
  background: #d1d5db;
  display: flex;
  align-items: center;
`

const BlogsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const BlogItem = styled.li`
  border-bottom: 1px solid #f3f4f6;

  &:hover {
    background-color: #f8fafc;
  }
`

const BlogLink = styled(Link)`
  display: block;
  padding: 20px 32px;
  color: #374151;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 32px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const NotFound = styled.div`
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
  padding: 40px;
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`

const NotFoundTitle = styled.h2`
  color: #ef4444;
`

const SingleUserBlogs = () => {
  const users = useSelector((state) => state.users)
  const { id } = useParams()
  const user = users.find((u) => u.id === id)

  if (!user) {
    return (
      <NotFound>
        <NotFoundTitle>User not found</NotFoundTitle>
      </NotFound>
    )
  }

  return (
    <Container>
      <Card>
        <UserName>{user.name}</UserName>
        <BlogAmount>
          {user.blogs.length} {user.blogs.length === 1 ? 'blog' : 'blogs'}{' '}
          created
        </BlogAmount>
      </Card>

      <Blogs>
        <BlogsTitle>Blogs</BlogsTitle>

        {user.blogs.length === 0 ? (
          <EmptyState>No blogs created yet</EmptyState>
        ) : (
          <BlogsList>
            {user.blogs.map((blog) => (
              <BlogItem key={blog.id}>
                <BlogLink to={`/blogs/${blog.id}`}>{blog.title}</BlogLink>
              </BlogItem>
            ))}
          </BlogsList>
        )}
      </Blogs>
    </Container>
  )
}

export default SingleUserBlogs
