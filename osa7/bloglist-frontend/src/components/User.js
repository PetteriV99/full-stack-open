const User = ({ user }) => {

  if (!user)
  {
    return(
      <div>
        <h2>user data is missing</h2>
      </div>
    )
  }

  return (
    <div className="items-center justify-center px-8 pt-6">
      <h2 className="items-center justify-center px-8 py-6 text-xl font-bold">User information</h2>
      <div className="flex min-h-screen bg-gray-200">
        <div className="w-full list-disc rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <div key={user.name} className=" py-4">
            <div className="font-bold text-gray-700">
              {user.name}
            </div>
            <h3 className="py-6 text-lg font-bold">added blogs</h3>
            <div>
              { user.blogs.length > 0 ?
                <ul>
                  {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
                </ul> : <p>no blogs</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User