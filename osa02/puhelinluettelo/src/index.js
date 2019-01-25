
import ReactDOM from 'react-dom';
import React, { useState } from 'react'

const Henkilot = ({ persons, newFilter }) => {
     let henkilot = persons.filter(henkilo =>{
         return(
             henkilo.name.toLowerCase().includes(newFilter.toLowerCase())
         )
     })
     henkilot = henkilot.map(henkilo => {
        return <p key={henkilo.name.toString()}>{(henkilo.name)} {henkilo.number}</p>
    })
    return (
        <div>
            
            <div>{henkilot}</div>
        </div>
    )
}

const Filtteri = ({ newFilter, kasitteleFilter }) => {
    return (
        <form>
            <div>
                rajaa näytettäviä <input value={newFilter} onChange={kasitteleFilter}></input>
            </div>

        </form>
    )
}


const Lisays = ({ lisaaHenkilo, newName, kasitteleNimi, newNumber, kasitteleNumero }) => {
    return (
        <div>
            
            <form onSubmit={lisaaHenkilo}>

                <div>
                    nimi: <input value={newName} onChange={kasitteleNimi} />
                </div>
                <div>numero: <input value={newNumber} onChange={kasitteleNumero} /></div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const lisaaHenkilo = (event) => {
        event.preventDefault()
        let nimi = newName
        let numero = newNumber
        if (!persons.map(henkilo => henkilo.name.toLowerCase()).includes(nimi.toLowerCase())) {
            let lisattava = {
                name: nimi,
                number: numero
            }
            setPersons(persons.concat(lisattava))
            setNewName('')
            setNewNumber('')

        } else {
            window.alert(`${nimi} on jo luettelossa`)
        }
    }

    const kasitteleNimi = (event) => {
        setNewName(event.target.value)

    }

    const kasitteleNumero = (event) => {
        setNewNumber(event.target.value)
    }

    const kasitteleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Filtteri newFilter={newFilter} kasitteleFilter={kasitteleFilter} />
            <h3>lisää uusi</h3>
            <Lisays lisaaHenkilo={lisaaHenkilo} newName={newName} kasitteleNimi={kasitteleNimi} kasitteleNumero={kasitteleNumero} newNumber={newNumber}  />
            <h3>Numerot</h3>
            <Henkilot persons={persons} newFilter={newFilter} />
        </div>
    )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'));


