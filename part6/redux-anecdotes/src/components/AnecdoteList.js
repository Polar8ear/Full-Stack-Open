
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { popNotification } from '../helpers/anectodeHelpers'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const vote = (anectode) => {
    dispatch(voteAnecdote(anectode.id))
    popNotification(
      `You have voted '${anectode.content}''`,
      dispatch,
    )
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
