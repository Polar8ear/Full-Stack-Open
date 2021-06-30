import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('');

  const addNewPerson = (event) =>{
    event.preventDefault()
    if(!persons.some((person)=>newName===person.name)){
      setPersons(persons.concat({name:newName,number:newNumber}))
      setNewName("")
      setNewNumber("")
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

  const personsToShow = !filter
    ? persons
    : persons.filter((person)=>{
          return(
            person.name.toUpperCase().includes(filter.toUpperCase())
          )
        }
      )
      

  return (
    <div>
      <h2>Phonebook</h2>

      <form>
        <div>
            filter: <input value={filter} onChange={(event)=>setFilter(event.target.value)} />
        </div>
      </form>

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
      {console.log(personsToShow)}
      {personsToShow.map(showDetails)}
      
    </div>
  )
}

export default App