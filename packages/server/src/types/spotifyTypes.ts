export type SpotifyAuthData = {
  accessToken: string
  refreshToken: string
  expiresIn: number
  timestamp: number
  userId: string
}

export type RefreshTokenResult = {
  accessToken: string
  expiresIn: number
  error?: string
}

export type CreatePlaylistResponse = {
  status: number
  id: string
  href: string
}

export type AddTracksToPlaylistResponse = {
  status: number
  snapshot_id: string
}
