import { useSelector } from 'react-redux'

const Notification = () => {

  const notifications = useSelector(state => state.notification)

  console.log(notifications)

  if (notifications.length <= 0) {
    return(null)
  }

  return (
    <div>
      {notifications.map( notification =>
        <div key={notification.message}>
          { notification.type === 'success' ?
            <div className="fixed bottom-0 w-full bg-blue-500 px-4 py-2 text-white">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">Success!</h3>
                  <p>{notification.message}</p>
                </div>
              </div>
            </div>
            : <div key={notification.message} className="fixed bottom-0 w-full bg-red-500 px-4 py-2 text-white">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">An error occured!</h3>
                  <p>{notification.message}</p>
                </div>
              </div>
            </div>} </div>)
      }
    </div>
  )
}

export default Notification