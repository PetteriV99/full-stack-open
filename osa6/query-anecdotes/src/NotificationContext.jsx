import { createContext, useReducer, useContext } from 'react'

const initialState = ''

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return state = action.payload
    case 'VOTE':
      return state = action.payload
    case 'ERROR':
      return state = action.payload
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)
  
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
  }

export const useContextValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useContextDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext