import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
)

const Statistics = (props) => {

  let all = props.values.good + props.values.neutral + props.values.bad
  let values = props.values.good + (props.values.bad * -1)

  return (
    <div>
      {all !== 0 ?
        <div>
          <StatisticLine  text="Good" value={props.values.good}></StatisticLine >
          <StatisticLine  text="Neutral" value={props.values.neutral}></StatisticLine >
          <StatisticLine  text="Bad" value={props.values.neutral}></StatisticLine >
          <StatisticLine  text='All' value={all}></StatisticLine >
          <StatisticLine  text='Average' value={values / all}></StatisticLine >
          <StatisticLine  text='Positive' value={props.values.good / all * 100 + ' %'}></StatisticLine >
        </div>
        : <p>No feedback given</p>
      }
    </div>
  )
}

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
      <Statistics values={{good, neutral, bad}}></Statistics>
    </div>
  )
}

export default App

/*
<StatisticLine  text='All' value={all}></StatisticLine >
<StatisticLine  text='Average' value={values / all}></StatisticLine >
<StatisticLine  text='Positive' value={good / all * 100 + ' %'}></StatisticLine >
*/