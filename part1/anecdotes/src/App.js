import React, { useState } from 'react'

const Display = ({text,anecdotes,points,number}) =>{
  return(
    <div>
      <h2>{text}</h2>
      <p>{anecdotes[number]}</p>
      <p>has {points[number]} votes</p>
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const max=anecdotes.length

  const generateRandomNum = (max) =>{
    return(
      // 
      // The random function generates a floating point between 0 and 1, so multiplying it by the number of items in the array can
      // pick a number between 0 to the number, then floor function make it an integer.
      // 
      Math.floor(Math.random()*max)
      
      )
      
    }
    
    const [selected, setSelected] = useState(generateRandomNum(max))
    const [points,setPoints] = useState(new Array(max).fill(0))
    const [highestIndex,setHighestIndex] = useState(0)

    let highest=0

    const updateHighest = (value,index)=>{

      if(value>=highest){
        highest=value
        setHighestIndex(index)
      }
    }
    
    const vote = (selected) =>{
      const copy = [...points]
      copy[selected]+=1
      copy.forEach(updateHighest)
      setPoints(copy)
    }
  
  return (
    <div>
      <Display text="Anecdote of the day" anecdotes={anecdotes} points={points} number={selected}></Display>
      <div>
        <button onClick={()=>vote(selected)}>Vote</button>

        <button onClick={()=>setSelected(generateRandomNum(max))}>Next anecdote</button>
      </div>
      <Display text="Anecdote with most votes" anecdotes={anecdotes} points={points} number={highestIndex}></Display>
      

    </div>
  )
}

export default App