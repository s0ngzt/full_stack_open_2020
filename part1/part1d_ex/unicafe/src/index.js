import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <div>
      <p>{text} {value} </p>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good+neutral+bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pos = good / all
  return (
    <div>
      <Statistic text="good" value ={good} />
      <Statistic text="neutral" value ={neutral} />
      <Statistic text="bad" value ={bad} />
      <Statistic text="all" value ={all} />
      <Statistic text="avg" value ={avg} />
      <Statistic text="pos" value ={pos} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOneG = () => {
    setGood(good+1)
  }
  const increaseByOneN = () => {
    setNeutral(neutral+1)
  }
  const increaseByOneB = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseByOneG} text="good" />
      <Button handleClick={increaseByOneN} text="neutral" />
      <Button handleClick={increaseByOneB} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
