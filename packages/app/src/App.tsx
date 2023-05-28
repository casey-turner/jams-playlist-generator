import './App.css'
import authClient from './api/authClient'

function App() {
  const handleConnect = () => {
    authClient
      .get('/connect')
      .then((response) => {
        // Handle the response data
        console.log(response.data)
      })
      .catch((error) => {
        // Handle any errors
        console.error(error)
      })
  }

  return (
    <>
      <button
        onClick={handleConnect}
        className="text-3xl text-blue-950 bg-red-500 rounded-full px-6 py-3"
      >
        Connect to Spotify
      </button>
    </>
  )
}

export default App
