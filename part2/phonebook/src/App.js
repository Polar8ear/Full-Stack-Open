import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' ,
      number: '040-1234567'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addNewPerson = (event) =>{
    event.preventDefault()
    if(!persons.some((person)=>newName===person.name)){
      setPersons(persons.concat({name:newName,number:newNumber}))
      setNewName("");setNewNumber("")
    }
    else{
      window.alert(`${newName} is already added to the phonebook`)
    }
  } 

  const showDetails = (person) => {
    return(
      <div key={person.name}>
        {person.name} {person.number}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={(event)=>setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(event)=>setNewNumber(event.target.value)} />
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(showDetails)}
      
    </div>
  )
}

export default App