
import React from 'react'
import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.content.value
    event.target.content.value = ''

    props.createNewAnecdote(anecdoteContent)
    props.setNotification('An anectode has been added')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="content"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const connectedAnectodeForm = connect(
  null,
  {
    createNewAnecdote,
    setNotification,
  }
)(AnecdoteForm)

export default connectedAnectodeForm