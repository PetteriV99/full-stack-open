import { useState, useEffect } from 'react'
import countryService from '../services/countryService'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    countryService
      .getCountry(name)
      .then(initialData => {
        console.log(initialData)
        setCountry({ data: initialData })
      })
  }, [name])

  return {
    country
  }
}