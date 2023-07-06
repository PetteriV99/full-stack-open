import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Countries = (params) => {

  const filteredCountries = params.values.filter(country => country.name.common.toLocaleLowerCase().includes(params.query.toLocaleLowerCase()))
  if (filteredCountries.length < 10 && filteredCountries.length != 1) {
    return (
      <div>{filteredCountries.map(country =>
        <p key={country.name.common}>{country.name.common}</p>
      )}
      </div>
    )
  }
  else if (filteredCountries.length === 1) {
    return (<CountryInfo values={filteredCountries[0]}></CountryInfo>)
  }
  else { return (<p>Too many countries, adjust filter</p>) }
}

const CountryInfo = (params) => {
  return (
    <div>
      <h1>{params.values.name.common}</h1>
      <p>capital {params.values.capital}</p>
      <p>area {params.values.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.entries(params.values.languages).map(([key, value]) => {
          return(<li key={key}>{value}</li>)
        })}
      </ul>
      <img src={params.values.flags.png}></img>
    </div>
  )
}

const FilterForm = (params) => {
  return (
    <form>
      <div>
        find countries <input value={params.value} onChange={params.onChange}></input>
      </div>
    </form>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterQuery, setFilterQuery] = useState('')

  const hook = () => {
    countryService
      .getAll()
      .then(countriesData => {
        setCountries(countriesData)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(hook, [])

  const handleChangeQuery = (event) => {
    setFilterQuery(event.target.value)
  }

  return (
    <div>
      <FilterForm value={filterQuery} onChange={handleChangeQuery} />
      <Countries query={filterQuery} values={countries}></Countries>
    </div>
  )

}

export default App

