import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
})

const store = createStore(reducer)

export default store
