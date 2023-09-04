import { useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = ({client}) => {

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
