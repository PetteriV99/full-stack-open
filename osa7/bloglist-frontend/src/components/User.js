const User = ({ user }) => {

  if (!user)
  {
    return(
      <div>
        <h2>user data is missing</h2>
      </div>
    )
  }

  console.log(user)

  return(
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {<ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>}
    </div>
  )

}

export default User