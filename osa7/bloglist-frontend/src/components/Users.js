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

  return(
    <div className="items-center justify-center px-8 pt-6">
      <h2 className="items-center justify-center px-8 py-6 text-xl font-bold">Users</h2>
      <div className="flex min-h-screen bg-gray-200">
        <div className="w-full list-disc rounded bg-white px-8 pb-8 pt-6 shadow-md">
          {users.map(user =>
            <div key={user.name} className="border-b border-gray-200 py-4 hover:bg-gray-100">
              <Link to={`/users/${user.id}`}>
                <div className="font-bold text-gray-700">
                  {user.name}
                </div>
                <div>
                  {user.blogs.length} blogs created
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Users