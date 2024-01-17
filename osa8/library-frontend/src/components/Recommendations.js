import React, { useState } from 'react'

const Recommendations = (props) => {

  const [activeFilter, setActiveFilter] = useState('')

  const books = props.books
  if (!books) {
    return (<p>no data</p>)
  }

  return (
    <div>
      <h2>recommendations</h2>
    </div>
  )
}

export default Recommendations
