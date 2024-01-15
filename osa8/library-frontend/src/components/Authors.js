import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import Select from "react-select"
import { EDIT_AUTHOR } from "../queries";

const Authors = ({ authors }) => {
  const [born, setBorn] = useState(1999)
  const [selectedOption, setSelectedOption] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const [changeBirthyear] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setLoggedIn(!!token)
  }, [])

  if (!authors) {
    return <p>no data</p>
  }

  const options = authors.map((author) => {
    return { value: author.name, label: author.name }
  });

  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name: selectedOption.value, setBornTo: Number(born) } })

    setBorn(1999)
  };

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
      {loggedIn ? (
        <div>
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
      ) : null}
    </div>
  );
};

export default Authors;
