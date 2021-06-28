import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNewPerson = (event) =>{
    event.preventDefault()
    if(!persons.some((person)=>newName===person.name)){
      setPersons(persons.concat({name:newName}))
      setNewName("")
    }
    else{
      window.alert(`${newName} is already added to the phonebook`)
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={(event)=>setNewName(event.target.value)} />
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person)=><div key={person.name}>{person.name}</div>)}
      
    </div>
  )
}

export default App