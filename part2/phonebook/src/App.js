import React, { useEffect,useState } from 'react'
import dataService from "./services/persons"

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

const Details = ({persons,filter,handleDelete}) =>{
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
        {person.name} {person.number} <button onClick={(event)=>handleDelete(event,person)}>Delete</button>
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

const Message = ({notification}) =>{
  if(notification===null){
    return null
  }
  return(
    <div className={`message ${notification.status}`}>{notification.message}</div>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(()=>{
    dataService.getAll()
         .then(data=>setPersons(data))
  },[])

  const addNewPerson = (event) =>{
    event.preventDefault()
    const newPerson ={name:newName,number:newNumber}
    setNewName("")
    setNewNumber("")
    if(!persons.some((person)=>newPerson.name.toUpperCase()===person.name.toUpperCase())){
      dataService.update(newPerson)
           .then(data=>{
              setPersons(persons.concat(data))
              setNotification({status:"confirmation",message:`Added ${newPerson.name}`})
              setTimeout(()=>setNotification(null),5000)
           })
    } 
    else if(window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)){
        const existingPersonIndex = persons.findIndex(person=>person.name.toUpperCase()===newName.toUpperCase())
        const copyPersons=[...persons]
        dataService.changePhoneNum(persons[existingPersonIndex].id,newPerson)
                  .then(data=>{
                    copyPersons[existingPersonIndex]=data
                    setPersons(copyPersons)
                    setNotification({status:"confirmation",message:`Changed ${newPerson.name}'s number`})
                    setTimeout(()=>setNotification(null),3000)
                  })
                  .catch(()=>{
                    setNotification({status:"error",message:`Information of ${newPerson.name} has already been removed from the server`})
                    setTimeout(()=>setNotification(null),3000)
                  })
    }
  }

  const handleDelete = (event,person) =>{
    if(window.confirm(`Do you want to delete ${person.name}`)){
      dataService.remove(person.id)
                 .then( setPersons(persons.filter(existingPerson=>existingPerson.id!==person.id) ) )
                 .catch(()=>{
                   console.log("catched error");
                   setNotification({status:"error",message:`Information of ${person.name} has already been removed from the server`})
                   setTimeout(()=>setNotification(null),5000)
                 })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Message notification={notification}/>
      <Filter filter={filter} setFilter={setFilter}/>

      <PersonsForm persons={persons} setPersons={setPersons} 
               newName={newName} setNewName={setNewName} 
               newNumber={newNumber} setNewNumber={setNewNumber}
               handleSubmit={addNewPerson}/>

      <Details persons={persons} filter={filter} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App