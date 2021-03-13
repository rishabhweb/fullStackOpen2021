import React, {useState} from 'react'

const Header = ({feedback}) => {
  return (
    <>
      <h1> {feedback} </h1>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick = {handleClick} > {text} </button>
    </>
  )
}

const Total = ({value}) => {
  return (
    <>
      <td> All </td>
      <td> {value.good + value.bad + value.neutral} </td>
    </>
  )
}

const Average = ({value}) => {
  return (
    <>
      <td> Average </td>
      <td> {(value.good - value.bad)/9} </td>
    </>
  )
}

const Positive = ({value}) => {
  return (
    <>
      <td> Positive </td> 
      <td>  {value.good/(value.total)*100} % </td> 
    </>
  )
}

const Statistic = ({text,value}) => {

   return (
    <>
      <td> {text} </td>
      <td> {value} </td>
    </>
  )
}
const Statistics = ({value}) => {


  if(value.good + value.bad + value.neutral === 0) {
    return(
      <>  
        <h1> {value.statistics} </h1>
        No feedback Given
      </>
    )
  }
  return (
    <>
      <h1> {value.statistics} </h1>
      <table>
        <tbody>
          <tr>
            <Statistic text = 'good' value = {value.good} />
          </tr>
          <tr>
            <Statistic text = 'neutral' value = {value.neutral} />
          </tr>
          <tr>
            <Statistic text = 'bad' value = {value.bad} />
          </tr>
          <tr>
            <Total value = {value}/>
          </tr>
          <tr>
            <Average value = {value}/>
          </tr>
          <tr>
            <Positive value = {value} />
          </tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {

  const feedback = 'Give feedback'
  //Save clicks of each button to its own state
  const [good,setGood] = useState(0) 
  const [neutral,setNeutral] = useState(0) 
  const [bad,setBad] = useState(0) 

  const value = {
    statistics : 'statistics',
    good: good,
    bad: bad,
    neutral:  neutral,
    total : good + bad + neutral
  }

  const incrementGood = () => {
    setGood(good + 1)
  }
  const incrementBad = () => {
    setBad(bad + 1)
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }
  return (
    <div>
      <Header feedback = {feedback}/>
      <Button handleClick ={incrementGood} text = 'good'/>
      <Button handleClick = {incrementNeutral} text = 'neutral'/>
      <Button handleClick = {incrementBad} text = 'bad'/>
      <Statistics value = {value}/>
    </div>
  )
} 

export default App