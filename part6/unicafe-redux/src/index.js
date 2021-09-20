import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }

  return (
    <div>
      <button type="button" onClick={good}>good</button>
      <button type="button">neutral</button>
      <button type="button">bad</button>
      <button type="button">reset stats</button>
      <div>
        good
        {store.getState().good}
      </div>
      <div>neutral</div>
      <div>bad</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
