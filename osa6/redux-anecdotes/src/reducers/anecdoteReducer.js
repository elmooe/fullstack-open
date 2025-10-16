import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0)).toString()

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote: (state, action) => {
      const updatedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0, id: generateId() })
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const savedAnecdote = await anecdoteService.updateAnecdote(updatedAnecdote)
    dispatch(updateAnecdote(savedAnecdote))
  }
}

export default anecdoteSlice.reducer