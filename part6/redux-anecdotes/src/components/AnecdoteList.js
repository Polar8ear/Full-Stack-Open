
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const { filter, anecdotes } = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (anectode) => {
    dispatch(voteAnecdote(anectode))
    dispatch(setNotification(`You have voted '${anectode.content}''`))
  }

  const caseInsensitiveIncludes = (text, searchedText) => {
    const cText = text.toUpperCase()
    const cSearchedText = searchedText.toUpperCase()
    return cText.includes(cSearchedText)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const anecdotesToBeShown = sortedAnecdotes.filter((anecdote) => caseInsensitiveIncludes(anecdote.content, filter.searchedText))

  return (
    <div>
      {anecdotesToBeShown.map(anecdote =>
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
