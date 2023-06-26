import { useContext } from 'react'
import CustomisePlaylistFormContext from '../context/CustomisePlaylistFormContext'

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
