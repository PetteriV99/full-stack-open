import { useNavigate } from 'react-router-dom'

export const Login = (props) => {

  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('')

    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
            username: <input />
        </div>
        <div>
            password: <input type='password' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}