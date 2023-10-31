import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    await props.onLogin({ username, password })
    navigate('..')
  }

  return(
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="username">
      Username
          </label>
          <input className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="username" value={username} type="text" placeholder="Username" onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
      Password
          </label>
          <input className="mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none" id="password" type="password" value={password} placeholder="******************" onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <div className="flex items-center justify-between">
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none" id='login-button' type="submit">
      Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm