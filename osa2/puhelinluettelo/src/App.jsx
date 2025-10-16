import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Alert from './components/Alert'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const personToUpdate = persons.find(person => person.name === newName)
      const updatedPerson = { ...personToUpdate, number: newNumber }
      personService
        .update(personToUpdate.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
          setAlertMessage(`Updated ${returnedPerson.name}'s number`)
          setAlertType('success')
          setNewName('')
          setNewNumber('')

          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
        .catch(error => {
          setAlertMessage(`Information of ${newName} has already been removed from server`)
          setAlertType('error')

          setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
        })
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setAlertMessage(`Added ${returnedPerson.name}`)
          setAlertType('success')

          setNewName('')
          setNewNumber('')

          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error adding person:', error)
        })
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(p => p.id === id)
     if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setAlertMessage(`Deleted ${personToDelete.name}`)
          setAlertType('success')

          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error deleting person:', error)
        })
      }
  }

  const filteredPhoneBook = filter === ''
    ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert message={alertMessage} type={alertType} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addPerson}
      />
      <h2>Numbers</h2>
        <Persons filteredPhonebook={filteredPhoneBook} deletePerson={(id) => handleDelete(id)} />
    </div>
  )
}

export default App