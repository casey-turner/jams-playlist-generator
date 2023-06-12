import { spotifyApi } from '../apis/spotifyApi'
import { PlaylistTrack } from '../types/playlistTypes'
import { logLevels, logger } from '../utils/logger'

const createPlaylist = (accessToken: string, userId: string, options: { name: string; description: string; public: boolean }) => {
  return spotifyApi
    .post(`/users/${userId}/playlists`, options, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      logger(logLevels.error, 'error', 'createPlaylist', error)
    })
}

const getSongUris = (songs: PlaylistTrack[]) => {
  return songs.map((song) => song.uri)
}

const addTracksToPlaylist = async (accessToken: string, playlistId: string, uris: string[]) => {
  return spotifyApi
    .post(
      `/playlists/${playlistId}/tracks`,
      { uris },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      logger(logLevels.error, error.message, 'addTracksToPlaylist', error)
    })
}

export { addTracksToPlaylist, createPlaylist, getSongUris }

