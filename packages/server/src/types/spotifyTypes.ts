export type SpotifyAuthData = {
  access_token: string
  refresh_token: string
  expires_in: number
  timestamp: number
  userId: string
}

export type SpotifyUserProfileData = {
  id: string
}

export type RefreshTokenResult = {
  access_token: string
  expires_in: number
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
