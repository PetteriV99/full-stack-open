import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Item = (props) => (
  <p>{props.text} {props.value}</p>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="Good"></Button>
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"></Button>
        <Button handleClick={() => setBad(bad + 1)} text="Bad"></Button>
      </div>
      <h1>Stats</h1>
      <div>
        <Item text="Good" value={good}></Item>
        <Item text="Neutral" value={neutral}></Item>
        <Item text="Bad" value={bad}></Item>
      </div>
    </div>
  )
}

export default App