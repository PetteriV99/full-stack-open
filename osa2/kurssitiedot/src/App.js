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
const Total = (props) => {

  let sum = 0;
  props.parts.forEach(element => {
    sum += element.exercises
  });

  return (
    <p>Number of exercises {sum}</p>
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
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App