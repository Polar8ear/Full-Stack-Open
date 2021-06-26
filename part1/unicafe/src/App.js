import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text,handleClick}) =>{
  return(<button onClick={handleClick}>{text}</button>)
}

const Statistics = ({good,neutral,bad})=> {
  const all=good+neutral+bad
  
  if(all!==0){
    return(
      <div>
        <Header text='Statistics'></Header>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {(good-bad)/all}</div>
        <div>positive {good/all*100}%</div>
      </div>
    )
  }
  return (<div>No feedback given</div>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <Header text='Give Feedback'></Header>
      <Button text="good" handleClick={() => setGood(good+1)}></Button>
      <Button text="neutral" handleClick={() => setNeutral(neutral+1)}></Button>
      <Button text="bad" handleClick={() => setBad(bad+1)}></Button>
      
     <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      

    </div>
  )
}


export default App