import { useState } from 'react'

const Anecdote = (props) => {
  return (
    <>
      <p>{props.text}</p>
      <p>has {props.votes} votes</p>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const handleVotes = (number, votes) => {
  console.log(number)
  const copy = [...votes]
  copy[number] += 1
  console.log(copy)
  return copy
}

const mostVotes = (array) => {
  let max = array.reduce((a, b) => Math.max(a, b), -Infinity)
  console.log(array.indexOf(max))
  return array.indexOf(max);
}

const getRandomNumberBetweenValues = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  let biggestNumber = mostVotes(votes)
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}></Anecdote>
      <Button text='next anecdote' handleClick={() => setSelected(getRandomNumberBetweenValues(0,7))}></Button>
      <Button text='vote' handleClick={() => setVotes(handleVotes(selected, votes))}></Button>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[biggestNumber]} votes={votes[biggestNumber]}></Anecdote>
    </div>
  )
}

export default App