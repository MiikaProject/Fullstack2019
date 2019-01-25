import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {

    return (
        <h1>{props.course}</h1>
    )
}

const Content = ({ parts }) => {  
    const osat = parts.map(osa => <Part key={osa.id} name={osa.name} exercises={osa.exercises}/> )    
    return (
        <div>{osat}</div>
    )
}
const Part = ({name, exercises}) => {
    return (
        <p> {name} {exercises}</p>
    )
}
const Total = ({ parts }) => {
    const tehtavia = parts.map(osa => osa.exercises).reduce((a,b)=>a+b)
    return (<div><p>yhteensä {tehtavia} tehtavää</p></div>)
}

export default Course

