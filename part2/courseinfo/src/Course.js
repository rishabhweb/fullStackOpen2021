import React from 'react'

const Part = ({id,part, exercises }) => {
  return (
    <>
      <li  > {part},  {exercises} </li>
    </>
  )
}

const Header = ({name}) => {
  return (
    <>
      <h1> {name} </h1>
    </>
  )
}
const Content = ({parts}) => {
  

  const listItems = parts.map((newpart) =>
    <Part key = {newpart.id}part = {newpart.name} exercises = {newpart.exercises} />
  )

    return (
      <ul>
        {listItems}
      </ul>
    )
}

const Total = ({parts}) => {
  const total =  parts.reduce((s, p) => s + p.exercises, 0);
  return  <b> Total of {(total)} exercises </b>
}
const Course = ({course}) => {
  return (
    <>
      <Header name = {course.name}/>
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  )
} 

export default Course;
