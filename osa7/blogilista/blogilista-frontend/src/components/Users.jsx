import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.thead`
  background: #d1d5db;
`

const HeaderRow = styled.tr`
  border-bottom: 2px solid #e1e5e9;
`

const HeaderCell = styled.th`
  padding: 20px 24px;
  text-align: left;
  font-weight: 700;
  font-size: 16px;
`

const DataRow = styled.tr`
  border-bottom: 1px solid #f3f4f6;

  &:hover {
    background-color: #f8fafc;
  }
`

const TableRow = styled.td`
  padding: 20px 24px;
`

const UserName = styled(Link)`
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`

const BlogCount = styled.span`
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  align-items: center;
`

const NoUsers = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
`

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container>
      <Title>Users</Title>

      <Card>
        {users.length === 0 ? (
          <NoUsers>No users found</NoUsers>
        ) : (
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Blogs Created</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <tbody>
              {users.map((user) => (
                <DataRow key={user.id}>
                  <TableRow>
                    <UserName to={`/users/${user.id}`}>{user.name}</UserName>
                  </TableRow>
                  <TableRow>
                    <BlogCount>{user.blogs.length}</BlogCount>
                  </TableRow>
                </DataRow>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  )
}

export default Users
