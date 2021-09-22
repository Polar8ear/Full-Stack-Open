import anecdoteReducer from './reducers/anecdoteReducer'
import { createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  anecdoteReducer,
  composeWithDevTools()
)

export default store