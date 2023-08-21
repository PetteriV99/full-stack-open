import { useState } from 'react'
//import { createStore } from 'redux'
//import reducer from './reducer'
import Button from './components/Button'
import Statistics from './components/Statistics'

//const store = createStore(reducer)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="Good"></Button>
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"></Button>
        <Button handleClick={() => setBad(bad + 1)} text="Bad"></Button>
      </div>
      <h1>Stats</h1>
      <Statistics values={{ good, neutral, bad }}></Statistics>
    </>
  )
}

export default App