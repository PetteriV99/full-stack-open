import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const Users = () => {

  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return(
    <div>
      <h2>users</h2>
      {users.map(user =>
        <p key={user.name}>{user.name}</p>
      )}
    </div>
  )

}

export default Users