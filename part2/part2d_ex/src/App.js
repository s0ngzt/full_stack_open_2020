import React, { useState,useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({person, handleClick}) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={() => handleClick(person.id)} >delete</button>
    </div>
  )
}

const Persons = ({persons, handleClick}) => {
  return (
    <div>
      {persons.map( person => <Person key={person.name} person={person} handleClick={handleClick} />)}
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
    personService
      .getAll()
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
    //已有
    const res = persons.find((person) => person.name === newName)
    if(res !== undefined) {

      const ans = window.confirm(`${res.name} already in, continue? `)

      if(ans) {
        //alert(`${newName} is already added to phonebook`)
        console.log(res)
        console.log({...res, number: newNumber})
        personService
          .update(res.id, {...res, number: newNumber})
          .then(response => response.data)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== res.name ? person : returnedPerson))
          })
          .catch(
            e => console.log(e)
          )
      }
    }
    else {
      setPersons(persons.concat(personObject))
      personService
        .create(personObject)
        .catch(
          e => console.log(e)
        )
    }
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

  const handleDelete = (id) => {
    if(window.confirm(`do you really wanna delete person ${id}`)) {

      personService
        .dlete(id)
        .then(
          setPersons(persons.filter((person) => person.id !== id))
        )
        .catch(error => {
          alert(
            `the person '${id}' not in database`
            )
            //setNotes(notes.filter(n => n.id !== id))
          }
        )
    }
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
      <Persons persons={personsToShow} handleClick={handleDelete} />
    </div>
  )
}

export default App
