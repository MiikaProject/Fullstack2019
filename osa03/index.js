const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))


let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]



app.get('/', (req, res) => {
  res.send('<h1>Hello! </h1>')
})
app.get('/persons', (req, res) => {
  res.json(persons)
})

app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => {
    return (person.id === id)
  })

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
  
})




app.get('/info', (req,res)=>{
    const henkilot = persons.length
    const aika = new Date()
    res.send(`<p>Puhelinluettelossa ${henkilot} henkilön tiedot </p> <p> \n ${aika}</p> `)
})

app.delete('/persons/:id', (req, res) =>{
  const id = Number(req.params.id)
  persons = persons.filter(person =>{
    return(person.id !== id)
  })
  res.status(204).end()
})


app.post('/persons', (req,res)=>{
  console.log(req.route.methods);
  
  var person = req.body
  console.log(person);
  
  
  if(person.name ===''){
    
    return(res.status(400).json({
      error: 'name missing'
    }))
  }
  if(persons.map(person=>person.name).includes(person.name)){
    
    
    return(res.status(400).json({
      error:'duplicate name'
    }))
    
    
  }

  
  
  
  const id = Math.floor(Math.random()*50)
  
  person = {
    name : person.name,
    number : person.number,
    id : id

  }
  
 
  persons = persons.concat(person)
  res.status(200).json(body=person)
  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
