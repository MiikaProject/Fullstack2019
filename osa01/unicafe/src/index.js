import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Otsikko = ()=>{
    return (
        <h1>anna palautetta</h1>
    )
}
const Nappulat = () => {
    return (
        <span>
            <Button /> 
            <Button /> 
            <Button />
        </span>
    )
}


const Button = () => {
    return (
        <span>
            <button>
                teksti
            </button>
        </span>
    )
}

const Tilastot = () => {
    return(
        <div>
            <h1>statistiikka</h1>
            <p>hyvä </p>
            <p>neutraali </p>
            <p>huono </p>
        </div>
    )
}


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>

            <Otsikko/>
            <Nappulat/>
            <Tilastot/>




        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)

