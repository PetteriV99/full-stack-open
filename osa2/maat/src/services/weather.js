import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'
const api_key = process.env.REACT_APP_API_KEY

const getWeatherCapital = (params) => {
    const request = axios.get(`${baseUrl}lat=${params.lat}&lon=${params.lon}&exclude=minutely,hourly,daily,alerts&appid=${api_key}`)
    return request.then(response => {
        return response.data
    })
}

export default {
    getWeatherCapital,
}