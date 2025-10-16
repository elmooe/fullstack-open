/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react"

const notificationContext = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, message: action.payload }
    case "CLEAR_NOTIFICATION":
      return { ...state, message: null }
    default:
      return state
  }
}

const NotificationContext = createContext()
export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationContext, { message: null })

  return (
    <NotificationContext.Provider value={{ message, messageDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context.message.message
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context.messageDispatch
}

export default NotificationContext