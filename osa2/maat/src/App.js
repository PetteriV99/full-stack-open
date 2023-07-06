import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Countries = (params) => {

  const filteredCountries = params.showOneCountry ? [] : params.values.filter(country => country.name.common.toLocaleLowerCase().includes(params.query.toLocaleLowerCase()))
  if (filteredCountries.length < 10 && filteredCountries.length !== 1) {
    return (
      <div>{filteredCountries.map(country =>
        <div key={country.name.common}>
          {country.name.common}
          <button name={country.name.common} onClick={params.onClick}>show</button>
        </div>
      )}
      </div>
    )
  }
  else if (filteredCountries.length === 1) {
    return (<div>
      <CountryInfo values={filteredCountries[0]}></CountryInfo>
      <WeatherInfo></WeatherInfo>
    </div>)
  }
  else { return (<p>Too many countries, adjust filter</p>) }
}

const WeatherInfo = (params) => {
  console.log(params)
  return (<h2>Weather</h2>)
}

const CountryInfo = (params) => {
  return (
    <div>
      <h1>{params.values.name.common}</h1>
      <p>capital {params.values.capital}</p>
      <p>area {params.values.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.entries(params.values.languages).map(([key, value]) => {
          return(<li key={key}>{value}</li>)
        })}
      </ul>
      <img src={params.values.flags.png} alt={`Flag of ${params.values.name.common}`}></img>
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
  const [singleCountry, setSingleCountry] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [showCountry, setShowCountry] = useState(false)

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

  const countryFilter = countries.filter(country => country.name.common.toLocaleLowerCase().includes(singleCountry.toLocaleLowerCase()))[0]
  console.log(countryFilter)

  const handleClick = (event) => {
    setShowCountry(true)
    console.log(event.target.name)
    setSingleCountry(event.target.name)
  }

  return (
    <div>
      <FilterForm value={filterQuery} onChange={handleChangeQuery} />
      <Countries onClick={handleClick} query={filterQuery} values={countries} showOneCountry={showCountry}></Countries>
      {showCountry ? <CountryInfo values={countryFilter}></CountryInfo> : null}
    </div>
  )

}

export default App

