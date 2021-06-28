import React from 'react';

const Header = ({ course }) => {
  return (
    <h1 key={course.id}>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((total,part)=>total+part.exercises,0)
  
  return(
    <h3>Total of {sum} exercises</h3>
  ) 
}


const Content = ({ course }) => {
  return(
    course.parts.map((part)=><p key={part.id}  >{part.name} {part.exercises}</p>)
  )
}
const Course = ({course}) => {
  return(
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>

    </div>


  )
} 

export default Course;