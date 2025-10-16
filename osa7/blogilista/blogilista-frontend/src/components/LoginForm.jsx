import styled from 'styled-components'

const Container = styled.form`
  max-width: 400px;
  margin: 50px auto;
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`

const Title = styled.h2`
  font-weight: 700;
  text-align: center;
`

const Group = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
`

const Button = styled.button`
  width: 100%;
  background: #60a5fa;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
  margin-top: 10px;

  &:hover {
    background: #2563eb;
  }
`

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <Container onSubmit={handleLogin} data-testid="login-form">
    <Title>Login</Title>

    <Group>
      <Label htmlFor="username">Username</Label>
      <Input
        type="text"
        id="username"
        data-testid="username"
        value={username}
        name="Username"
        placeholder="Enter your username"
        onChange={({ target }) => setUsername(target.value)}
        required
      />
    </Group>

    <Group>
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        id="password"
        data-testid="password"
        value={password}
        name="Password"
        placeholder="Enter your password"
        onChange={({ target }) => setPassword(target.value)}
        required
      />
    </Group>

    <Button type="submit">Login</Button>
  </Container>
)

export default LoginForm
