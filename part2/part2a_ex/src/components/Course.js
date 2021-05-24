import React from 'react'

const Header = ({name}) => {
  return <h2>{name}</h2>
}

const Part = ({name, exercises}) => (
  <p>{name} {exercises}</p>
)

const Total = ({parts}) => {
  const total = parts.map(part => part.exercises).reduce((a, b) => a+b, 0)

  return (
    <div>
      <b><p>Total of {total} exercises</p></b>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map( part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
