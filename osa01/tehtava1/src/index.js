import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <p>
                <Part nimi={props.osa1} tehtavia={props.tehtavia1}/>
            </p>
            <p>
            <Part nimi={props.osa2} tehtavia={props.tehtavia2}/>
            </p>
            <p>
            <Part nimi={props.osa3} tehtavia={props.tehtavia3}/>
            </p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            {props.nimi} {props.tehtavia}
        </div>
    )
}

const Total = (props) => {
    let lukumaara = 0;
    lukumaara = props.yksi + props.kaksi + props.kolme ;
    return (
        <div>
            <p>
            yhteensä {lukumaara} tehtavää
            </p>
        </div>
    )

}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <p>
                <Content osa1={part1} tehtavia1={exercises1} />
            </p>
            <p>
                <Content osa1={part2} tehtavia1={exercises2} />
            </p>
            <p>
                <Content osa1={part3} tehtavia1={exercises3} />
            </p>
            <Total yksi={exercises1} kaksi={exercises2} kolme={exercises3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))