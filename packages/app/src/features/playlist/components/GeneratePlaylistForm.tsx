import authClient from '@utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usePlaylistDataContext from '../hooks/usePlaylistDataContext'

const GeneratePlaylistForm = () => {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')

  const { setAiTracks, setAiPlaylistTitles } = usePlaylistDataContext()

  const handleChange = (event) => {
    setPrompt(event.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (prompt) {
      try {
        const response = await authClient.post('/playlist', { prompt })
        if (response.data.success) {
          const { playlist, playlistTitles } = response.data

          // Add the new key to each track object in the playlist
          const updatedPlaylist = playlist.map((track) => {
            return {
              ...track,
              isSelected: true, // Add your new key-value pair here
            }
          })

          setAiTracks(updatedPlaylist)
          setAiPlaylistTitles(playlistTitles)
          navigate('/customise-playlist')
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

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4 w-full">
        <label
          htmlFor="prompt"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Your playlist
        </label>
        <textarea
          value={prompt}
          onChange={handleChange}
          id="prompt"
          rows="4"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Write your playlist prompt..."
        ></textarea>
        <button
          type="submit"
          disabled={!prompt}
          className="mt-4 rounded-full bg-red-500 px-6 py-3 text-3xl text-blue-950"
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default GeneratePlaylistForm
