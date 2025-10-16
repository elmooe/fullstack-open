import { useState, useEffect } from 'react'
import axios from 'axios'
import getWeather from '../services/weather'

const Filter = ({ countries, onClick }) => {
  const api_key = import.meta.env.VITE_API_KEY

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    const country = countries[0]
    const [weather, setWeather] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    
    useEffect(() => {
      getWeather({ capital: country.capital, api_key })
        .then(response => {
          setWeather(response) 
          setImageUrl(`https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)      
        })
        .catch(error => {
          console.error('Error fetching weather data:', error)
        })
    }, [country])

    return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>Languages:</h3>
      <ul>
          {Object.values(country?.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} width="150" />
        <h2>Weather in {country.name.common}</h2>
        <p>Temperature: {weather?.main?.temp} °C</p>
        <img src={imageUrl} alt={weather?.weather?.description} />
        <p>Wind: {weather?.wind?.speed} m/s</p>
    </div>
    )
  } else if (countries.length > 1) {
    return (
      <ul>
      {countries.map(country => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => onClick(country.name.common)}>show</button>
        </li>
      ))}
    </ul>
    )
  }
}

export default Filter