import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './components/NotificationContext'
import useQueries from './queries'

const App = () => {
  const { result, updateAnecdoteMutation } = useQueries()
  const notificationDispatch = useNotificationDispatch()

  if (result.isLoading) {
    return <div>Data is loading...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecdoteMutation.mutate({ id, updatedAnecdote }, {
      onSuccess: () => {
        notificationDispatch({ 
          type: 'SET_NOTIFICATION', 
          payload: `Anecdote '${anecdote.content}' voted` 
        })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
      }
    })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
