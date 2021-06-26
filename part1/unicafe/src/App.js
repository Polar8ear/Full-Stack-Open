import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text,handleClick}) =>{
  return(<button onClick={handleClick}>{text}</button>)
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
      
      <Header text='Statistics'></Header>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>

    </div>
  )
}


export default App