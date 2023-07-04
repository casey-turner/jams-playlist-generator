import { useContext } from 'react'
import PlaylistFormContext from '../context/PlaylistFormContext'

const usePlaylistFormContext = () => {
  const context = useContext(PlaylistFormContext)

  if (context === undefined) {
    throw new Error(
      'usePlaylistFormContext must be used within a PlaylistFormProvider'
    )
  }

  return context
}

export default usePlaylistFormContext
