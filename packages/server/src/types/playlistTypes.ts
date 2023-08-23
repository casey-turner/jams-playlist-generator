export type PlaylistGenerationRequest = {
  genres: string[]
  numberOfSongs: number
  repeatArtist: boolean
}

export type OpenAiResponse = {
  playlist?: Array<{ title: string; artist: string }>
  playlistTitles?: string[]
}

export type SpotifyTrackData = {
  name: string
  uri: string
  artists: { name: string }[]
  album: { name: string; images: { url: string }[] }
}

export type PlaylistCreationRequest = {
  tracks: string[]
  playlistTitle?: string
}

export type PlaylistTrack = {
  title: string
  uri: string
  artist: string
  album: string
  albumCover: string
}
