import { useState, useEffect } from 'react'
import countryService from '../services/countryService'

export const useCountry = (name) => {
  const [countryData, setCountryData] = useState(null)

  useEffect(() => {
    countryService
      .getCountry(name)
      .then(initialData => {
        setCountryData(initialData)
      })
  }, [name])

  return {
    countryData
  }
}