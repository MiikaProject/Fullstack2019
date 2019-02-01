import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';


const Hakukentta = ({ newFilter, kasitteleFilter }) => {
    return (
        <div>
            <form>
                find countries
                <input value={newFilter} onChange={kasitteleFilter}></input>
            </form>
        </div>
    )
}

const Maalista = ({ maat, newFilter, setNewFilter, saadata, setNewsaadata, haeSaadata }) => {


    let filteroidytMaat = maat.filter(maa => {
        return (
            maa.name.toLowerCase().includes(newFilter.toLowerCase())
        )
    })


    if (filteroidytMaat.length > 1 && filteroidytMaat.length < 10) {
        return (
            <MontaMaata maat={filteroidytMaat} setNewFilter={setNewFilter} />
        )
    }

    if (filteroidytMaat.length === 1) {
        return (
            <Maa maa={filteroidytMaat} saadata={saadata} setNewsaadata={setNewsaadata} haeSaadata={haeSaadata} />
        )
    }

    if (filteroidytMaat.length === 0) {
        return (
            <div></div>
        )
    }

    if (filteroidytMaat.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )

    }
    return (
        <div>Too many matches,specify another filter</div>
    )

}

const Maa = ({ maa, saadata, setNewsaadata, haeSaadata }) => {
    const kielet = maa[0].languages.map(kieli => kieli.name).map(a => {
        return (
            <li key={a.toString()}>{a}</li>
        )
    })

    return (
        <div>
            <h2>{maa[0].name}</h2>
            <p>capital {maa[0].capital}</p>
            <p>population {maa[0].population} </p>
            <h3>languages</h3>
            <div>{kielet}</div>
            <p></p>
            <div><img src={maa[0].flag}  width="100" height="100" alt="Maan lippu"></img></div>
            <Saadata maa={maa} saadata={saadata} setNewsaadata={setNewsaadata} haeSaadata={haeSaadata} />

        </div>
    )
}

const Saadata = ({ maa, saadata, haeSaadata }) => {
    haeSaadata(maa)
    if (saadata.length !== 0) {
        const lampotila = saadata.main.temp
        const kuvake = saadata.weather[0].icon
        const tuulinopeus = saadata.wind.speed
        const tuulisuunta = saadata.wind.deg
        const kuvakeurl = `http://openweathermap.org/img/w/${kuvake}.png`
        return (
            <div>
                <h3>Weather in {maa[0].capital}</h3>
                <span><h4>temperature: {lampotila}  Celsius</h4> </span>
                <span><img src={kuvakeurl} alt="säätila kuvake" ></img></span>
                <h4>wind: {tuulinopeus}  kph direction {tuulisuunta}  degrees</h4>
            </div>
        )
    } else {
        return (null)
    }
}

const MontaMaata = ({ maat, setNewFilter }) => {
    const maajoukko = maat.map(maa =>
        <p
            key={maa.name.toString()}>{maa.name}
            <Button maa={maa} setNewFilter={setNewFilter} />
        </p>)

    return (
        <div>{maajoukko}</div>
    )
}

const Button = ({ maa, setNewFilter }) => {
    const handleClick = () => {
        setNewFilter(maa.name.toLowerCase())

    }
    return (
        <span> <button onClick={handleClick}>Show</button></span>
    )
}


const App = () => {
    const [maat, setMaat] = useState([])
    const [newFilter, setNewFilter] = useState('')
    const [saadata, setNewsaadata] = useState([])

    const haeSaadata = (maa) => {
        useEffect(() => {
            
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${maa[0].capital}&units=metric&appid=afc960df3af7a3aa29bd46bd71d234cb`)
                .then(response => {
                    setNewsaadata(response.data)
                })

        }, [])
    }


    useEffect(() => {
        
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                
                setMaat(response.data)
            })
    }, [])


    const kasitteleFilter = (event) => {


        setNewFilter(event.target.value)
    }

    return (
        <div>
            <Hakukentta newFilter={newFilter} kasitteleFilter={kasitteleFilter} />
            <Maalista maat={maat} newFilter={newFilter} setNewFilter={setNewFilter} saadata={saadata} setNewsaadata={setNewsaadata} haeSaadata={haeSaadata} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));


