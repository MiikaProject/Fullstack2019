import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Napit = ({ handleVote , handleNext }) => {
    return (
        <div>
            <Button text="vote" handleClick={handleVote} />
            <Button text="next anecdote" handleClick={handleNext} />
        </div>
    )
}

const Button = ({ text, handleClick }) => {
    return (
        <span><button onClick={handleClick}>{text}</button></span>
    )
}

const Aanitilanne = ({pisteet, selected}) =>{
    return(
        <div>
        has {pisteet[selected]} votes 
        </div>
    )
}

const EnitenAanestetty = ({eniten, anecdotes, pisteet}) => {
          
    
    return(
        <div>
           <h1>Anecdote with most votes</h1> 
           <p>{anecdotes[pisteet.indexOf(eniten)]}</p>
            <p>has {eniten} votes</p>
        </div>
    )
}



const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [pisteet,setPisteet] = useState(new Array(anecdotes.length).fill(0))
    
    const setAnekdootti = () => {
        let luku = Math.floor((Math.random() * 6));
        setSelected(luku)
    }

    const LisaaAani = () => {
        const copy =[...pisteet]
        copy[selected] +=1
        setPisteet(copy)
        
    }

    

    const EnitenAania = () =>{
        let suurin = 0;
        for (let i=0 ; i < pisteet.length;i++){
            if (suurin < pisteet[i]){
                suurin = pisteet[i];
            }
        }
        return(suurin)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <Aanitilanne pisteet={pisteet} selected={selected}/>
            <Napit handleNext={setAnekdootti} handleVote={LisaaAani}/>
            <EnitenAanestetty eniten={EnitenAania()} pisteet={pisteet} anecdotes={anecdotes} />
             
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
