import anecdoteService from '../services/anecdote'

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type){
    case('VOTE'):
      const id = action.data.id
      const votedAnecdote = state.find((anecdote) => anecdote.id===id)
      const updatedNote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
      return state.map((anecdote) => anecdote.id===id?updatedNote:anecdote)

    case('NEW_ANECDOTE'):
      const newAnecdote = action.data
      return state.concat(newAnecdote)

    case('INIT_ANECDOTES'):
      return action.data.anecdotes

    default:
      return state
  }
}

//Below are action creators
export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: { ...newAnecdote }
    })
  }
}

export const voteAnecdote = (id) => {
  return({
    type: 'VOTE',
    data: { id },
  })
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data: { anecdotes },
    })
  }
}


export default reducer
