import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Otsikko = ()=>{
    return (
        <h1>anna palautetta</h1>
    )
}
const Nappulat = ({handleGood, handleNeutral, handleBad}) => {
    return (
        <span>
            <Button teksti="hyvä" handleClick={handleGood} /> 
            <Button teksti="neutraali" handleClick={handleNeutral}/> 
            <Button teksti="huono" handleClick={handleBad}/>
        </span>
    )
}


const Button = ({teksti,handleClick}) => {
    return (
        <span>
            <button onClick={handleClick}>
                {teksti}
            </button>
        </span>
    )
}

const Statistics = ({good, neutral, bad}) => {

    let summa = good + neutral + bad
    let keskiarvo = (1*good -1*bad + 0*neutral)/summa
    let positiivisia = ((good/summa)*100)

    if(summa === 0){
        return(
            <p>Ei yhtään palautetta annettu
                



            </p>
            
        )
    } else {
        return(
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td><h1>Statistiikka</h1></td>   
                    </tr>
                    <tr>
                        <td>hyvä</td>
                        <td>{good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{neutral}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{bad}</td>
                    </tr>
                    <tr>
                        <td>yhteensä</td>
                        <td>{summa}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{keskiarvo}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{positiivisia} %</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        )
    }

    
}


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const plusGood = () =>{
        setGood(good+1)
    }
    const handleNeutral = () =>{
        setNeutral(neutral+1)
    }
    const handleBad = () =>{
        setBad(bad+1)
    }

    return (
        <div>
            <Otsikko/>
            <Nappulat handleGood={plusGood} handleNeutral={handleNeutral} handleBad={handleBad}/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)

