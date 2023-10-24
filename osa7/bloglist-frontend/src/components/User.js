const User = ({ user }) => {

  if (!user)
  {
    return(
      <div>
        <h2>user data is missing</h2>
      </div>
    )
  }

  return(
    <div>
      <h2>{user.name}</h2>
    </div>
  )

}

export default User