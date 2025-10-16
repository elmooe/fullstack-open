import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/name/'

const getCountries = (name) => {
    const request = axios.get(baseUrl + name)
    return request
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching countries', error)
        return []
        }
    )
}

export default getCountries