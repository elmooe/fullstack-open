import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Bar = styled.nav`
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  padding: 16px 24px;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Links = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`

const NavLink = styled(Link)`
  color: #f9fafb;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;

  &:hover {
    color: #2563eb;
  }
`

const LoggedIn = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #f9fafb;
`

const UserName = styled.span`
  color: #f9fafb;
`

const Button = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`

const Navigation = ({ user, handleLogout }) => {
  return (
    <Bar>
      <Container>
        <Links>
          <NavLink to="/">Blogs</NavLink>
          <NavLink to="/users">Users</NavLink>
        </Links>

        {user && (
          <LoggedIn>
            <UserName>{user.name}</UserName>
            <span>logged in</span>
            <Button onClick={handleLogout}>Logout</Button>
          </LoggedIn>
        )}
      </Container>
    </Bar>
  )
}

export default Navigation
