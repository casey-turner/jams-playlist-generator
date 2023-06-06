import Cookies from 'js-cookie'
import { useState } from 'react'
import './App.css'
import authClient from './api/authClient'
import LogoutButton from './components/LogoutButton'
import TrackList from './components/TrackList'

function App() {
  const [prompt, setPrompt] = useState('')
  const [tracks, setTracks] = useState([])
  const [playlistTitles, setPlaylistTitles] = useState([])
  const [selectedPlaylistTitle, setselectedPlaylistTitle] = useState('')

  const handleChange = (event) => {
    setPrompt(event.target.value)
  }

  const handlePlaylistTitleChange = (event) => {
    setselectedPlaylistTitle(event.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (prompt) {
      try {
        const response = await authClient.post('/playlist', { prompt })
        if (response.data.success) {
          console.log(response.data)
          const { playlist, playlistTitles } = response.data
          setTracks(playlist)
          setPlaylistTitles(playlistTitles)
        } else {
          const error = response.data.error
            ? response.data.error
            : 'Something went wrong'
          console.log(error)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const createPlaylist = async () => {
    if (tracks && tracks.length > 0 && selectedPlaylistTitle) {
      try {
        const response = await authClient.post('/create-playlist', {
          tracks,
          playlistTitle: selectedPlaylistTitle,
        })
        if (response.status === 200) {
          console.log('Playlist created successfully')
          setTracks([])
          setPrompt([])
        } else {
          const error = response.data.error
            ? response.data.error
            : 'Something went wrong'
          console.log(error)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const loggedIn = () => {
    if (Cookies.get('spotify')) {
      return true
    }
    return false
  }

  if (!loggedIn())
    return (
      <>
        <a href="http://localhost:3000/connect">Connect to Spotify</a>
      </>
    )

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full mb-4">
        <label
          htmlFor="prompt"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your playlist
        </label>
        <textarea
          value={prompt}
          onChange={handleChange}
          id="prompt"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your playlist prompt..."
        ></textarea>
        <button
          type="submit"
          disabled={!prompt}
          className="mt-4 text-3xl text-blue-950 bg-red-500 rounded-full px-6 py-3"
        >
          Submit
        </button>
      </form>
      {tracks && tracks.length > 0 && <TrackList tracks={tracks} />}
      {playlistTitles && playlistTitles.length > 0 && (
        <div className="mt-4">
          <h2 className="text-3xl text-blue-950">Playlist Titles</h2>
          <div>
            {playlistTitles.map((title) => (
              <label key={title} className="inline-flex items-center mt-3">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  name={`playlist-${title}`}
                  value={title}
                  onChange={handlePlaylistTitleChange}
                  checked={selectedPlaylistTitle === title}
                />
                <span className="ml-2 text-gray-700">{title}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <hr className="my-4" />
      <button
        onClick={createPlaylist}
        className="text-3xl text-blue-950 bg-red-500 rounded-full px-6 py-3"
      >
        Create Playlist
      </button>
      <LogoutButton />
    </div>
  )
}

export default App
