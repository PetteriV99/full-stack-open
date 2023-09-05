const Anecdote = ({ anecdote }) => (
  <div>
    <ul>
      <h1>{anecdote.content} by {anecdote.author}</h1>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={`${anecdote.info}`}>{anecdote.info}</a></p>
    </ul>
  </div>
)

export default Anecdote