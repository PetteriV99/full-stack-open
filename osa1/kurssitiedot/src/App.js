// Task 1.2: kurssitiedot, step1
// This code is exactly done as instructed :) So obviously spaghetti

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
        <Part list={props.parts[0]}></Part>
        <Part list={props.parts[1]}></Part>
        <Part list={props.parts[2]}></Part>
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

const App = () => {

  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App