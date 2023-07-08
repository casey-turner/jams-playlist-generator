import { Tracks } from '@/types'
import { createContext, useState } from 'react'

type playlistDataContextType = {
  aiTracks: Tracks[]
  setAiTracks: (tracks: Tracks[]) => void
  aiPlaylistTitles: string[]
  setAiPlaylistTitles: (titles: string[]) => void
}

export const PlaylistDataContext = createContext<playlistDataContextType>(
  {} as playlistDataContextType
)

export const PlaylistDataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [aiTracks, setAiTracks] = useState<Tracks[]>([])
  const [aiPlaylistTitles, setAiPlaylistTitles] = useState<string[]>([])

  return (
    <PlaylistDataContext.Provider
      value={{
        aiTracks,
        setAiTracks,
        aiPlaylistTitles,
        setAiPlaylistTitles,
      }}
    >
      {children}
    </PlaylistDataContext.Provider>
  )
}
