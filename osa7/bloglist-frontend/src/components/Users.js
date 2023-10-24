import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Users = () => {

  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const row = {
    display: 'flex'
  }

  const column = {
    flex: '10%'
  }

  const column2 = {
    flex: '90%'
  }

  return(
    <div>
      <h2>users</h2>
      {users.map(user =>
        <div style={row} key={user.name}>
          <div style={column}>
            <h4>name</h4>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </div>
          <div style={column2}>
            <h4>blogs created</h4>
            {user.blogs.length}
          </div>
        </div>
      )}
    </div>
  )

}

export default Users