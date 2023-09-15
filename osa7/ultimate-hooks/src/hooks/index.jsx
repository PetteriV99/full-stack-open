import { useState, useEffect } from 'react'

export const useResource = (name) => {
  const [data, setData] = useState(null)

  return {
    data
  }
}