//npm install -s react@16.8.0-alpha.0 react-dom@16.8.0-alpha.0
import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Course from './components/course';

const Courses = ({courses}) => {
    const kurssit = courses.map(kurssi =>
        <Course key={kurssi.id} course={kurssi} />
        )
    return(
        <div>{kurssit}</div>
    )
}

const App = () => {
    const courses = [
      {
        name: 'Half Stack -sovelluskehitys',
        id: 1,
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10,
            id: 1
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7,
            id: 2
          },
          {
            name: 'Komponenttien tila',
            exercises: 14,
            id: 3
          }
        ]
      },
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 2,
            id: 1
          },
          {
            name: 'Middlewaret',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <div>
        <Courses courses={courses} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))


