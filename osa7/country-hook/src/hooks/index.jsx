import { useState, useEffect } from 'react'
import countryService from '../services/countryService'

export const useCountry = (name) => {
  const [data, setData] = useState(null)

  useEffect(() => {

    if (name !== '') {
      countryService
        .getCountry(name)
        .then(initialData => {
          setData(initialData)
        })
    }
  }, [name])

  return {
    data
  }
}