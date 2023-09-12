import { useState, useEffect } from 'react'
import countryService from '../services/countryService'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {

    if (name !== '') {
      countryService
        .getCountry(name)
        .then(initialData => {
          setCountry({ data: initialData })
        })
    }
  }, [name])

  return {
    country
  }
}