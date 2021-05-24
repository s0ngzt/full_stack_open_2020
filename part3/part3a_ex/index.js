const express = require('express')
const app = express()

const morgan = require('morgan')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

let persons = [
  {
    id: 1,
    name: "Alice",
    number: "111-1111"
  },
  {
    id: 2,
    name: "Bob",
    number: "111-1112"
  },
  {
    id: 3,
    name: "Chapel",
    number: "111-1113"
  },
  {
    id: 4,
    name: "Dylan",
    number: "111-1114"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  const numPerson = persons.length
  res.send(
    `<p>there are ${numPerson} person(s) in phonebook</p>
    <br>
    time: ${Date()}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const id = Math.floor(Math.random() * 9999 + 1)
  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number ) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  if (persons.findIndex(person => person.name === body.name) !== -1) {
    return response.status(400).json({
      error: 'name already exists'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
