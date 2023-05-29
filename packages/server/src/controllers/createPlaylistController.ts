import { spotifyApi } from '../apis/spotifyApi'
import { logLevels, logger } from '../utils/logger'

const createPlaylist = (accessToken, userId, options) => {
  return spotifyApi
    .post(`/users/${userId}/playlists`, options, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      logger(logLevels.error, error.message, 'createPlaylist', error)
    })
}

const getSongUris = (songs) => {
  return songs.map((song) => song.uri)
}

const addTracksToPlaylist = async (accessToken, playlistId, uris) => {
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

export { createPlaylist, getSongUris, addTracksToPlaylist }
