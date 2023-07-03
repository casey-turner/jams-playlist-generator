import { useContext } from 'react'
import CustomisePlaylistFormContext from '../context/PlaylistFormContext'

const useCustomisePlaylistFormContext = () => {
  const context = useContext(CustomisePlaylistFormContext)

  if (context === undefined) {
    throw new Error(
      'useCustomisePlaylistFormContext must be used within a CustomisePlaylistFormProvider'
    )
  }

  return context
}

export default useCustomisePlaylistFormContext
