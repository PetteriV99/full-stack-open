import { useState } from 'react'
import { gql, useMutation  } from '@apollo/client'
import Select from 'react-select';

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: String!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      id
    }
  }
`

const Authors = (props) => {

  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [ changeName ] = useMutation(EDIT_AUTHOR)

  const authors = props.authors
  if (!authors) {
    return (<p>no data</p>)
  }

  const options = authors.map(author => {
    return {value: author.name, label: author.name}
  })

  const submit = async (event) => {
    event.preventDefault()

    changeName({ variables: { name: selectedOption.value, born } })

    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <form onSubmit={submit}>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
