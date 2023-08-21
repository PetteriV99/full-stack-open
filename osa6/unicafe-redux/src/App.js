import { createStore } from 'redux'
import counterReducer from './reducer'
import Button from './components/Button'
import Statistics from './components/Statistics'

const store = createStore(counterReducer)

const App = () => {

  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={() => store.dispatch({ type: 'GOOD' })} text="Good"></Button>
        <Button handleClick={() => store.dispatch({ type: 'GOOD' })} text="Neutral"></Button>
        <Button handleClick={() => store.dispatch({ type: 'GOOD' })} text="Bad"></Button>
      </div>
      <h1>Stats</h1>
      <Statistics values={store.getState()}></Statistics>
    </>
  )
}

export default App