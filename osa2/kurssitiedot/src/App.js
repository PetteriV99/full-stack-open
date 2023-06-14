const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.list.name} {props.list.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((element, index) => (
        <Part list={element} key={index}></Part>
      )
      )}
    </div>
  )
}

// Task 2.3
const Total = (props) => {
  const init = 0
  const sum = props.parts.reduce((acc, current) =>
    acc + current.exercises, init)
  return (
    <p>Total of {sum} exercises</p>
  )
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App