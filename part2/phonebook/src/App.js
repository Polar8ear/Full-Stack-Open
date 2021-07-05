import React, { useEffect,useState } from 'react'
import webService from "./services/persons"

const Filter = ({filter,setFilter}) => {
  return(
    <form>
        <div>
            filter: <input value={filter} onChange={(event)=>setFilter(event.target.value)} />
        </div>
      </form>
  )
}

const PersonsForm = ({persons,setPersons,newName,setNewName,newNumber,setNewNumber,handleSubmit}) =>{  

  return(
    <div>
      <h3>Add a new</h3>

      <form onSubmit={handleSubmit}>
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
    </div>
  )
}

const Details = ({persons,filter}) =>{
  const personsToShow = !filter
  ? persons
  : persons.filter((person)=>{
  return(
          person.name.toUpperCase().includes(filter.toUpperCase())
          )
        }
      )
  
  const showDetails = (person) => {
    return(
      <div key={person.name}>
        {person.name} {person.number}
      </div>
    )
  }

  return(
    <div>
      <h3>Number</h3>
      {personsToShow.map(showDetails)}
    </div>
  )
}




const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('');

  useEffect(()=>{
    webService.getAll()
         .then(data=>setPersons(data))
  },[])

  const addNewPerson = (event) =>{
    event.preventDefault()
    if(!persons.some((person)=>newName===person.name)){
      const newPerson ={name:newName,number:newNumber}
      console.log(newPerson)
      setNewName("")
      setNewNumber("")
      webService.update(newPerson)
           .then(data=>{
              setPersons(persons.concat(data))
           })

      
    }
    else{
      window.alert(`${newName} is already added to the phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter}/>

      <PersonsForm persons={persons} setPersons={setPersons} 
               newName={newName} setNewName={setNewName} 
               newNumber={newNumber} setNewNumber={setNewNumber}
               handleSubmit={addNewPerson}/>

      <Details persons={persons} filter={filter}/>
      
    </div>
  )
}

export default App