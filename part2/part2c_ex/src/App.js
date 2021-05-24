import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Filter = ({filt, handleFiltChange}) => {
  return (
    <div>filter shown with <input value={filt} onChange={handleFiltChange} /></div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map( person => <Person key={person.name} person={person} />)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ filt, setFilt ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    //console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('promise fulfilled')
        setPersons(response.data)
      })
    },
    []
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.findIndex((person) => person.name === newName) !== -1)
      alert(`${newName} is already added to phonebook`)
    else
      setPersons(persons.concat(personObject))
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFiltChange = (event) => {
    setFilt(event.target.value)
  }

  const personsToShow = filt === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filt))

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>search</h2>
      <Filter filt={filt} handleFiltChange={handleFiltChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
