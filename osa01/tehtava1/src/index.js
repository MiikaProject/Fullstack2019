import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    console.log(props);
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <div>
                <Part nimi={props.parts[0].name} tehtavia={props.parts[0].exercises} />
                <Part nimi={props.parts[1].name} tehtavia={props.parts[1].exercises} />
                <Part nimi={props.parts[2].name} tehtavia={props.parts[2].exercises} />
        </div>
    )
}

const Part = (props) => {
    return (
        <div><p>{props.nimi} {props.tehtavia}</p></div>
    )
}

const Total = (props) => {
    let lukumaara = 0;
    lukumaara = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises ;
    return (<div><p>yhteensä {lukumaara} tehtavää</p></div>)
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts ={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))