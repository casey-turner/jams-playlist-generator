export type Track = {
  title?: string
  artist?: string
  album?: string
  albumCover?: string
  duration?: string
  uri?: string
  checked?: boolean
}

export type Tracks = {
  tracks: Track
}
