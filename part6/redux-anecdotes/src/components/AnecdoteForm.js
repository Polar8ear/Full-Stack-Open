
import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { popNotification } from '../helpers/anectodeHelpers'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.content.value
    event.target.content.value = ''

    dispatch(createNewAnecdote(anecdoteContent))
    popNotification(
      'An anectode has been added',
      dispatch,
    )
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

export default AnecdoteForm