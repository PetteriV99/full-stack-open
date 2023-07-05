import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Countries = (params) => {
  if (params.show) {
  return (
    <div>{params.values.map(country => 
      <p key={country.name.common}>{country.name.common}</p>
    )}
    </div>
  )}
  else { return (<p>too many countries match, specify another filter</p>) }
}

const countryInfo = (params) => {
  return (
    <div>
      <h1>{params.name}</h1>
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
  const [showCountries, setShowCountries] = useState(false)
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

  const filteredCountries = countries.filter(country => country.name.common.toLocaleLowerCase().includes(filterQuery.toLocaleLowerCase()))

  const handleChangeQuery = (event) => {
    setFilterQuery(event.target.value)
  }

  return (
    <div>
      <FilterForm value={filterQuery} onChange={handleChangeQuery} />
      <Countries show={showCountries} values={filteredCountries}></Countries>
    </div>
  )

}

export default App

