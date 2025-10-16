import { combineReducers } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'
import notificationReducer from './notificationReducer'

const rootReducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer,
  notification: notificationReducer,
})

export default rootReducer
