import axios from 'axios'

const api = 'https://studies.cs.helsinki.fi/restcountries/api/name'

export const getCountry = (country) =>
  axios.get(`${api}/${country}`).then(res => res.data)

export default {
  getCountry
}