import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import blogsReducer from "./reducers/blogsReducer"
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  notification: notificationReducer,
  blogs: blogsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
