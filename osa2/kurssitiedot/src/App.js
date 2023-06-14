const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.list.name} {props.list.exercises}</p>
  )
}
// Fix antipattern
const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part list={part} key={part.id}></Part>
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
    <b>Total of {sum} exercises</b>
  )
}

const Course = (props) => {
  return (
    <>
      {props.course.map(course => (
        <div key={course.id}>
          <Header name={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      ))}
    </>
  )
}

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <Course course={courses} />
  )
}

export default App