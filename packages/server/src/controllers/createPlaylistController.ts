import { AxiosResponse } from 'axios'
import { spotifyApi } from '../apis/spotifyApi'
import { PlaylistTrack } from '../types/playlistTypes'
import {
  AddTracksToPlaylistResponse,
  CreatePlaylistResponse,
} from '../types/spotifyTypes'
import { logLevels, logger } from '../utils/logger'

const createPlaylist = async (
  accessToken: string,
  userId: string,
  options: { name: string; description: string; public: boolean }
) => {
  try {
    const response: AxiosResponse<CreatePlaylistResponse> =
      await spotifyApi.post(`/users/${userId}/playlists`, options, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    return response.data
  } catch (error) {
    logger(
      logLevels.error,
      'Error occurred while creating the playlist',
      'createPlaylist',
      error
    )
  }
}

const getSongUris = (songs: PlaylistTrack[]) => {
  return songs.map((song) => song.uri)
}

const addTracksToPlaylist = async (
  accessToken: string,
  playlistId: string,
  uris: string[]
) => {
  try {
    const response: AxiosResponse<AddTracksToPlaylistResponse> =
      await spotifyApi.post(
        `/playlists/${playlistId}/tracks`,
        { uris },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
    return response.data
  } catch (error) {
    logger(
      logLevels.error,
      'Error occurred while adding tracks to the playlist',
      'addTracksToPlaylist',
      error
    )
  }
}

export { addTracksToPlaylist, createPlaylist, getSongUris }
