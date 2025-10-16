import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
    <table>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={`${positive} %`} />
    </table>
    </>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodClicked = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const neutralClicked = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const badClicked = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const average = (good - bad) / all || 0

  const positive = all > 0 ? (good / all) * 100 : 0

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={goodClicked} text="good" />
      <Button onClick={neutralClicked} text="neutral" />
      <Button onClick={badClicked} text="bad" />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average.toFixed(2)}
        positive={positive.toFixed(2)}
      />
    </div>
  )
}

export default App