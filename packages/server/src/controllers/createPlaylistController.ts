import { AxiosResponse } from 'axios'
import { Request, Response } from 'express'
import { spotifyApi } from '../apis/spotifyApi'
import { PlaylistCreationRequest } from '../types/playlistTypes'
import {
  AddTracksToPlaylistResponse,
  CreatePlaylistResponse,
} from '../types/spotifyTypes'
import { logLevels, logger } from '../utils/logger'

// CREATE PLAYLIST - create a playlist on Spotify and add tracks to it
const createPlaylist = async (req: Request, res: Response) => {
  try {
    // AUTH CHECK - check if Spotify authentication data is available
    if (!req.spotifyAuthData) {
      throw new Error('Spotify authentication data is missing.')
    }

    // EXTRACT - extract necessary data from request body and authentication data
    const { accessToken, userId } = req.spotifyAuthData
    const { tracks, playlistTitle } = req.body as PlaylistCreationRequest

    // VALIDATE - validate input data
    if (!accessToken || !userId || !tracks) {
      logger(
        logLevels.error,
        'Missing or invalid input data.',
        '/create-playlist'
      )
      return res.status(422).json({ message: 'Missing or invalid input data.' })
    }

    // PLAYLIST OPTIONS - set options for playlist creation
    const playlistOptions = {
      name: playlistTitle || 'JAMS Playlist',
      description: 'Made with 💙 by JAMS Playlist Generator',
      public: false,
    }

    // CREATE PLAYLIST - send POST request to create a playlist on Spotify
    const createPlaylistResponse: AxiosResponse<CreatePlaylistResponse> =
      await spotifyApi.post(`/users/${userId}/playlists`, playlistOptions, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

    // EXTRACT - extract playlist ID from response
    const { status, data } = createPlaylistResponse
    const playlistId = data.id

    // VALIDATE - validate playlist creation response
    if (status !== 201 || !playlistId) {
      logger(
        logLevels.error,
        'Playlist creation failed',
        '/create-playlist',
        createPlaylistResponse
      )
      return res.status(400).json({ message: 'Playlist creation failed' })
    }

    // ADD TRACKS TO PLAYLIST - send POST request to add tracks to the newly created playlist.
    const addTracksToPlaylistResponse: AxiosResponse<AddTracksToPlaylistResponse> =
      await spotifyApi.post(
        `/playlists/${playlistId}/tracks`,
        { uris: tracks },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

    // VALIDATE - validate adding tracks to playlist response
    const addTracksStatus = addTracksToPlaylistResponse.status
    if (addTracksStatus !== 201) {
      logger(
        logLevels.error,
        'Adding tracks to playlist failed',
        '/create-playlist',
        addTracksToPlaylistResponse
      )
      res.status(400).json({ message: 'Adding tracks to playlist failed' })
      return
    }

    // SUCCESS - send success response with playlist ID
    res.status(200).json({
      message: 'Playlist created successfully',
      playlistId: playlistId,
    })
  } catch (error) {
    logger(
      logLevels.error,
      'Playlist creation failed',
      '/create-playlist',
      error
    )
    res.status(500).json({ message: 'Playlist creation failed' })
  }
}

export { createPlaylist }
