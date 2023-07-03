import { useContext } from 'react'
import { PlaylistDataContext } from '../context/PlaylistDataContext'

const usePlaylistDataContext = () => {
  const context = useContext(PlaylistDataContext)

  if (context === undefined) {
    throw new Error(
      'usePlaylistDataContext must be used within a PlaylistDataProvider'
    )
  }
  return context
}

export default usePlaylistDataContext
