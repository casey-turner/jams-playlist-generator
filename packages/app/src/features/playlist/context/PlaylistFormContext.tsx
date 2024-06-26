// @ts-nocheck
import { Tracks } from '@/types'
import { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import usePlaylistDataContext from '../hooks/usePlaylistDataContext'

type playlistFromContextType = {
  selectedTracks: Tracks[]
  setSelectedTracks: (tracks: Tracks[]) => void
  selectedPlaylistTitle: string
  setSelectedPlaylistTitle: (title: string) => void
  step: number
  setStep: (step: number) => void
  playlistTitles: string[]
  aiPlaylistTitles: string[]
  aiTracks: Tracks[]
}

const PlaylistFormContext = createContext<playlistFromContextType>(
  {} as playlistFromContextType
)

export const PlaylistFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { aiTracks, setAiTracks, aiPlaylistTitles, setAiPlaylistTitles } =
    usePlaylistDataContext()

  const [step, setStep] = useLocalStorage('Jams_step', 1)

  const contextValue = {
    aiTracks,
    setAiTracks,
    aiPlaylistTitles,
    setAiPlaylistTitles,
    step,
    setStep,
  }

  return (
    <PlaylistFormContext.Provider value={contextValue}>
      {children}
    </PlaylistFormContext.Provider>
  )
}

export default PlaylistFormContext
