import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(baseUrl)
      setResources(data.data)
    }
    getData()
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources([...resources, response.data])
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}