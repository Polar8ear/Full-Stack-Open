import { createStore, combineReducers } from 'redux'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  blogs: blogsReducer,
})

const store = createStore(reducer)

export default store
