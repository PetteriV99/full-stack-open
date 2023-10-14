import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    login({ username, password })
    //navigate('/')
  }

  return (

    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

export default LoginForm