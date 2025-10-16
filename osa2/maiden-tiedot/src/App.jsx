import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import getCountries from './services/rest-countries.js'

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
      if (value) {
      getCountries(value)
      .then(countries => {
          setCountries(countries)
        })
        .catch(error => {
          console.error('Error fetching countries:', error)
          setCountries([])
        })
    } 
    setCountries([])
  }, [value])
  
  const handleChange = (event) => {
    setValue(event.target.value)
  } 

  const handleClick = name => {
    getCountries(name)
    .then(country => {
      setCountries(country)
    })
  }

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>
       <Filter countries={countries} onClick={handleClick} />
    </div>
  )
}

export default App