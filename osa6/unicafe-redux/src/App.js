import Button from './components/Button'
import Statistics from './components/Statistics'

const App = ({ store }) => {

  const good = () => store.dispatch({ type: 'GOOD' })
  const ok = () => store.dispatch({ type: 'OK' })
  const bad = () => store.dispatch({ type: 'BAD' })
  const reset = () => store.dispatch({ type: 'ZERO' })

  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={good} text="Good"></Button>
        <Button handleClick={ok} text="Neutral"></Button>
        <Button handleClick={bad} text="Bad"></Button>
        <Button handleClick={reset} text="Reset"></Button>
      </div>
      <h1>Stats</h1>
      <Statistics values={store.getState()}></Statistics>
    </>
  )
}

export default App