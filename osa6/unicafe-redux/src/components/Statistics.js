import StatisticLine from './StatisticsLine'

const Statistics = (props) => {

  let all = props.values.good + props.values.neutral + props.values.bad
  let values = props.values.good + (props.values.bad * -1)

  return (
    <>
      {all !== 0 ?
        <table>
          <tbody>
            <StatisticLine text="Good" value={props.values.good}></StatisticLine >
            <StatisticLine text="Neutral" value={props.values.neutral}></StatisticLine >
            <StatisticLine text="Bad" value={props.values.bad}></StatisticLine >
            <StatisticLine text='All' value={all}></StatisticLine >
            <StatisticLine text='Average' value={values / all}></StatisticLine >
            <StatisticLine text='Positive' value={props.values.good / all * 100 + ' %'}></StatisticLine >
          </tbody>
        </table>
        : <p>No feedback given</p>
      }
    </>
  )
}

export default Statistics