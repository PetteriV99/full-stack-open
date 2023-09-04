import { useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContextDispatch } from '../NotificationContext'

const AnecdoteForm = ({client}) => {

  const dispatch = useContextDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      dispatch( { payload: `too short anecdote, must be length 5 or more`, type: 'ERROR' } )
      setTimeout(() => {
        dispatch( { type: 'RESET' } )
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch( { payload: `new anecdote ${content} was created`, type: 'CREATE' } )
    event.target.anecdote.value = ''
    console.log('new anecdote')
    setTimeout(() => {
      dispatch( { type: 'RESET' } )
    }, 5000)
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
