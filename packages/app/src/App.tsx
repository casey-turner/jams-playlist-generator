import { useState } from 'react'
import './App.css'
import authClient from './api/authClient'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
