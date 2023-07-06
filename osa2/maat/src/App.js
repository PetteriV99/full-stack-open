import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Countries = (params) => {
  if (!params.values) {
    return ("error getting country data")
  }
  if (params.values.length > 10) {
    return ("too many matches, adjust filter")
  }
  return (
    <div>{params.values.map(country =>
      <div key={country.name.common}>
        {country.name.common}
        <button name={country.name.common} onClick={params.onClick}>show</button>
      </div>
    )}
    </div>
  )
}

const WeatherInfo = (params) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const weatherData = (lat, lon) => {
      weatherService.getWeatherCapital(lat, lon)
        .then(weatherData => {
          setWeather(weatherData)
        })
        .catch(error => {
          console.log(error)
        })
    }
    weatherData(params.values.latlng[0], params.values.latlng[1])
  }, [params])

  return (
    <div>
      <h2>Weather</h2>
      {weather ?
        <div>
          <p>temperature {weather.current.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}></img>
          <p>wind {weather.current.wind_speed} m/s</p>
        </div>
        :
        'error getting temp'}
    </div>
  )
}

const CountryInfo = (params) => {
  if (!params.values) {
    return ("error getting country info")
  }
  return (
    <div>
      <h1>{params.values.name.common}</h1>
      <p>capital {params.values.capital}</p>
      <p>area {params.values.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.entries(params.values.languages).map(([key, value]) => {
          return (<li key={key}>{value}</li>)
        })}
      </ul>
      <img src={params.values.flags.png} alt={`Flag of ${params.values.name.common}`}></img>
      <WeatherInfo values={params.values}></WeatherInfo>
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
    setShowCountry(false)
    setFilterQuery(event.target.value)
  }

  const countryFilter = countries.filter(country => country.name.common.toLocaleLowerCase().includes(filterQuery.toLocaleLowerCase()))
  const showOneCountry = countryFilter.length === 1

  const handleClick = (event) => {
    setShowCountry(true)
    setFilterQuery(event.target.name)
  }

  console.log(filterQuery)

  return (
    <div>
      <FilterForm value={filterQuery} onChange={handleChangeQuery} />
      {(showCountry || showOneCountry) ? <CountryInfo values={countryFilter[0]}></CountryInfo> : <Countries onClick={handleClick} values={countryFilter}></Countries>}
    </div>
  )

}

export default App

