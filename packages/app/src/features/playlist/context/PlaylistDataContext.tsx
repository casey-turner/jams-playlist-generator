import { createContext, useState } from 'react'

type Track = {
  title?: string
  artist?: string
  album?: string
  albumCover?: string
}

type playlistDataContextType = {
  tracks: Track[]
  setTracks: (tracks: Track[]) => void
  playlistTitles: string[]
  setPlaylistTitles: (playlistTitles: string[]) => void
}

export const PlaylistDataContext = createContext<playlistDataContextType>(
  {} as playlistDataContextType
)

export const PlaylistDataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [tracks, setTracks] = useState<Track[]>([])
  const [playlistTitles, setPlaylistTitles] = useState<string[]>([])

  return (
    <PlaylistDataContext.Provider
      value={{ tracks, setTracks, playlistTitles, setPlaylistTitles }}
    >
      {children}
    </PlaylistDataContext.Provider>
  )
}
