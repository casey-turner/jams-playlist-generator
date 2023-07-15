// @ts-nocheck
// import authClient from '@utils/api'
import { Tracks } from '@/types'
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
        // const response = await authClient.post('/playlist', { prompt })
        // if (response.data.success) {
        //   const { playlist, playlistTitles } = response.data

        // Add 'checked' key to each track object in the playlist
        // const updatedPlaylist = playlist.map((track) => {
        //   return {
        //     ...track,
        //     checked: true,
        //   }
        // })

        const updatedPlaylist: Tracks[] = [
          {
            album: 'Fear of the Dark (2015 Remaster)',
            albumCover:
              'https://i.scdn.co/image/ab67616d00001e020dda9c11454b9053d07f585a',
            artist: 'Iron Maiden',
            checked: true,
            title: 'Fear of the Dark - 2015 Remaster',
            uri: 'spotify:track:6p8eFfPw3nQkf37aT3AkmK',
          },
          {
            album: 'Ace of Spades (Expanded Edition)',
            albumCover:
              'https://i.scdn.co/image/ab67616d00001e022051e219a4af7648223953c1',
            artist: 'Motörhead',
            checked: true,
            title: 'Ace of Spades',
            uri: 'spotify:track:6EPRKhUOdiFSQwGBRBbvsZ',
          },
          {
            album: 'Metallica',
            albumCover:
              'https://i.scdn.co/image/ab67616d00001e02cf84c5b276431b473e924802',
            artist: 'Metallica',
            checked: true,
            title: 'Enter Sandman',
            uri: 'spotify:track:5sICkBXVmaCQk5aISGR3x1',
          },
          {
            album: 'The Number of the Beast (2015 Remaster)',
            albumCover:
              'https://i.scdn.co/image/ab67616d00001e025c29a88ba5341ca428f0c322',
            artist: 'Iron Maiden',
            checked: true,
            title: 'Hallowed Be Thy Name - 2015 Remaster',
            uri: 'spotify:track:469rBLYJUZHMJLtq2Wch3h',
          },
          {
            album: 'Paranoid (2009 Remastered Version)',
            albumCover:
              'https://i.scdn.co/image/ab67616d00001e029683e5d7361bb80bfb00f46d',
            artist: 'Black Sabbath',
            checked: true,
            title: 'Paranoid',
            uri: 'spotify:track:1jzDzZWeSDBg5fhNc3tczV',
          },
        ]
        const playlistTitles = [
          'Headbangers Paradise',
          'Heavy Metal Mayhem',
          'Rocking out with my Metalhead friends',
        ]

        const updatedPlaylistTitles = playlistTitles.map((title, index) => ({
          title: title,
        }))

        setAiTracks(updatedPlaylist)
        setAiPlaylistTitles(updatedPlaylistTitles)
        navigate('/customise-playlist')
        // } else {
        //   const error = response.data.error
        //     ? response.data.error
        //     : 'Something went wrong'
        //   console.log(error)
        // }
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
