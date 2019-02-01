
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'

import personService from './services/persons'


const Henkilot = ({ persons, newFilter, poistaHenkilo }) => {
    let henkilot = persons.filter(henkilo => {
        return (
            henkilo.name.toLowerCase().includes(newFilter.toLowerCase())
        )
    })


    henkilot = henkilot.map(henkilo => {
        return <p key={henkilo.name.toString()}>{(henkilo.name)} {henkilo.number}  <RemoveButton henkilo={henkilo} poistaHenkilo={poistaHenkilo} /></p>
    })
    return (
        <div>

            <div>{henkilot}</div>
        </div>
    )
}

const RemoveButton = ({ henkilo, poistaHenkilo }) => {
    return (
        <button onClick={() => poistaHenkilo(henkilo)}  >poista</button>
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


const Ilmoitus = ({ teksti }) => {

    const ilmoitusTyyli = {
        color: 'green',
        borderSize: 2,
        borderColor: 'green',
        borderStyle: 'solid',
        borderRadius: '5px',
        backgroundColor: 'lightgrey',
        padding: '5px',
        fontSize: 30
    }

    if (teksti === '') {
        return (null)
    } else {
        return (
            <div style={ilmoitusTyyli} >{teksti}</div>
        )
    }


}

const VirheIlmoitus = ({teksti}) =>{
    const virheilmoitusTyyli = {
        color: 'red',
        borderSize: 2,
        borderColor: 'red',
        borderStyle: 'solid',
        borderRadius: '5px',
        backgroundColor: 'lightgrey',
        padding: '5px',
        fontSize: 30
    }
    if(teksti===''){
        return(null)
    } else {
        return(
            <div style={virheilmoitusTyyli}>{teksti}</div>
        )
    }
    }
    

const App = () => {

    useEffect(() => {
        personService
            .getAll()
            .then(henkilolista => {
                setPersons(henkilolista)

            })


    }, [])




    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [tapahtumaViesti, setTapahtumaViesti] = useState('')
    const [virheTeksti, setVirheTeksti] = useState('')

    const lisaaHenkilo = (event) => {
        event.preventDefault()


        let nimi = newName
        let numero = newNumber
        if (persons.map(henkilo => henkilo.name.toLowerCase()).includes(nimi.toLowerCase())) {



            const valinta = window.confirm(`${nimi} on jo luettelossa, korvataanko vanha numero uudella`)
            if (valinta) {

                let etsittavaHenkilo = persons.find(henkilo => {
                    if (henkilo.name.toLowerCase() === nimi.toLowerCase()) {
                        return henkilo
                    }
                })





                const uusiNumero = { name: nimi, number: numero }


                personService



                    .paivitaNumero(etsittavaHenkilo.id, uusiNumero)
                    .then(response => {
                        setTapahtumaViesti(`Vaihdettiin henkilön ${etsittavaHenkilo.name} numero`)
                        setTimeout(() => {
                            setTapahtumaViesti('')
                        }, 2000)

                        setPersons(persons.map(henkilo => {
                            if (henkilo.id !== etsittavaHenkilo.id) {
                                return (henkilo)
                            } else {
                                return response
                            }
                        }

                        ))
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error =>{
                        setVirheTeksti(`Henkilö ${etsittavaHenkilo.name} oli jo poistettu`)
                        setTimeout(() => {
                            setVirheTeksti('')
                        }, 3000)
                    })


            } else {
                return
            }

        }
        if (!persons.map(henkilo => henkilo.name.toLowerCase()).includes(nimi.toLowerCase())) {
            const lisattava = {
                name: nimi,
                number: numero
            }
            personService
                .create(lisattava)
                .then(henkilolista => {


                    setTapahtumaViesti(`Lisättiin ${lisattava.name}`)
                    setTimeout(() => {
                        setTapahtumaViesti('')
                    }, 2000)
                    setPersons(persons.concat(henkilolista))
                    setNewName('')
                    setNewNumber('')
                })
        } else {


        }
    }

    const poistaHenkilo = (henkilo) => {
        const valinta = window.confirm(`Poistetaanko ${henkilo.name}`)
        if (valinta === true) {
            personService
                .removePerson(henkilo.id)
                .then(() => {


                    setTapahtumaViesti(`Poistettiin henkilö ${henkilo.name}`)
                    setTimeout(() => {
                        setTapahtumaViesti('')
                    }, 2000)
                    personService.getAll()
                        .then(response => {
                            setPersons(response)
                        })
                })
                
        } else {
            return
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
            <Ilmoitus teksti={tapahtumaViesti} />
            <VirheIlmoitus teksti={virheTeksti} />
            <Filtteri newFilter={newFilter} kasitteleFilter={kasitteleFilter} />
            <h3>lisää uusi</h3>
            <Lisays lisaaHenkilo={lisaaHenkilo} newName={newName} kasitteleNimi={kasitteleNimi} kasitteleNumero={kasitteleNumero} newNumber={newNumber} />
            <h3>Numerot</h3>
            <Henkilot persons={persons} newFilter={newFilter} setPersons={setPersons} poistaHenkilo={poistaHenkilo} />
        </div>
    )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'));


