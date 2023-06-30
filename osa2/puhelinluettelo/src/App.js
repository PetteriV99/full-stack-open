import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = (params) => {
  return (
    <div>
      {params.values.name} {params.values.number}
      <button onClick={() => params.removePerson(params.values.id)}>delete</button>
    </div>
  )
}

const Persons = (params) => {
  return (
    params.values.map(person => 
      <Person key={person.id} values={person} removePerson={params.removePerson}></Person>
    )
  )
}

const FilterForm = (params) => {
  return (
    <form>
      <div>
        filter shown with <input value={params.value} onChange={params.onChange}></input>
      </div>
    </form>
  )
}

const PersonForm = (params) => {
  return (
    <form onSubmit={params.onSubmit}>
      <div>
        name: <input value={params.nameValue} onChange={params.onChangeName} />
      </div>
      <div>
        number: <input value={params.numberValue} onChange={params.onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const checkSimilar = persons.find(person => person.name === personObject.name)
    if (checkSimilar) {
      alert(`${newName} is already added to phonebook`)
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id) => {
    console.log(id)
    const confirmed = window.confirm(`Delete ${persons[id - 1].name} ?`)
    if (confirmed) {
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const filteredPersons = false ? persons : persons.filter(
    person => person.name.toLocaleLowerCase().includes(filterQuery.toLocaleLowerCase()))

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeQuery = (event) => {
    setFilterQuery(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm value={filterQuery} onChange={handleChangeQuery} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        numberValue={newNumber}
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons values={filteredPersons} removePerson={removePerson} />
    </div>
  )

}

export default App