import axios from 'axios'

const getWeather = ({ capital, api_key }) => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default getWeather