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
        <table>
          <tbody>
            <Statistic text="good" value={good}></Statistic>
            <Statistic text="bad" value={bad}></Statistic>
            <Statistic text="neutral" value={neutral}></Statistic>
            <Statistic text="average" value={(good-bad)/all}></Statistic>
            <Statistic text="positive" value={good/all*100}></Statistic>
          </tbody>
        </table>
      </div>
    )

  }
  return (<div>No feedback given</div>)
}

const Statistic = ({text,value}) =>{return(

    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>



)
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