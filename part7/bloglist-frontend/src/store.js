import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import blogsReducer from "./reducers/blogsReducer"
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  blogs: blogsReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
