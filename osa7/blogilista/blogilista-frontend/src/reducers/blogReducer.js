import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const { id, updatedBlog } = action.payload
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    findBlogById(state, action) {
      return state.find((blog) => blog.id === action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog, findBlogById } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(appendBlog(createdBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const likeBlog = (id, blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blogObject)
    dispatch(updateBlog({ id, updatedBlog }))
  }
}

export const getBlogById = (id) => {
  return (dispatch, getState) => {
    const blog = getState().blogs.find((blog) => blog.id === id)
    if (blog) {
      dispatch(findBlogById(blog))
    }
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(updateBlog({ id, updatedBlog }))
  }
}

export default blogSlice.reducer
