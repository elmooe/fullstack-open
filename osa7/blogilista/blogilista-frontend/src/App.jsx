import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
  createComment,
} from './reducers/blogReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/userReducer'
import { showNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import SingleUserBlogs from './components/SingleUserBlogs'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(
        showNotification(
          `A new blog "${blogObject.title}" by ${blogObject.author} added`,
          'success',
          5000
        )
      )
    } catch (error) {
      dispatch(showNotification('Failed to add blog', 'error', 5000))
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      dispatch(likeBlog(id, updatedBlog))
    } catch (error) {
      dispatch(showNotification('Failed to update blog', 'error', 5000))
    }
  }

  const addComment = async (id, comment) => {
    try {
      dispatch(createComment(id, comment))
      dispatch(showNotification('Comment added successfully', 'success', 5000))
    } catch (error) {
      dispatch(showNotification('Failed to add comment', 'error', 5000))
    }
  }

  const handleDeleteBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (
      window.confirm(
        `Remove blog "${blogToDelete.title}" by ${blogToDelete.author}`
      )
    ) {
      try {
        dispatch(deleteBlog(id))
        dispatch(
          showNotification(
            `Blog "${blogToDelete.title}" was deleted`,
            'success',
            5000
          )
        )
        navigate('/')
      } catch (error) {
        dispatch(showNotification('Failed to delete blog', 'error', 5000))
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 'error', 5000))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  )

  return (
    <div>
      {user && <Navigation user={user} handleLogout={handleLogout} />}
      <Notification message={notification.message} type={notification.type} />

      {!user ? (
        loginForm()
      ) : (
        <Routes>
          <Route path="/" element={<BlogList addBlog={addBlog} />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                updateBlog={updateBlog}
                deleteBlog={handleDeleteBlog}
                addComment={addComment}
                user={user}
              />
            }
          />
          <Route path="/users/:id" element={<SingleUserBlogs />} />
        </Routes>
      )}
    </div>
  )
}

export default App
