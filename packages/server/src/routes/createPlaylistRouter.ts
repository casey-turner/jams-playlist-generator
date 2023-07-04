import express, { Request, Response } from 'express'
import {
  addTracksToPlaylist,
  createPlaylist,
  getSongUris,
} from '../controllers/createPlaylistController'
import { authenticateUser } from '../middlewares/authenticateUser'
import { PlaylistCreationRequest } from '../types/playlistTypes'
import { logLevels, logger } from '../utils/logger'

const router = express.Router()

// Create playlist endpoint
router.post(
  '/create-playlist',
  authenticateUser,
  (req: Request, res: Response) => {
    // console.log(req.spotifyAuthData)
    console.log('req', req.body)

    const { accessToken, userId } = req.spotifyAuthData ?? {}
    const { tracks, playlistTitle } = req.body as PlaylistCreationRequest

    const playlistOptions = {
      name: playlistTitle,
      description: 'A playlist created with the Spotify API!',
      public: false,
    }

    if (
      !accessToken ||
      !userId ||
      !tracks ||
      !playlistTitle ||
      !playlistOptions
    ) {
      logger(
        logLevels.error,
        'string',
        '/create-playlist',
        'Missing required parameters'
      )
      res.status(400).json({ message: 'Missing required parameters' })
      return
    }

    createPlaylist(accessToken, userId, playlistOptions)
      .then((playlist) => {
        const playlistId = playlist?.id
        const uris = getSongUris(tracks)

        if (!playlistId) {
          logger(
            logLevels.error,
            'string',
            '/create-playlist',
            'Missing Playlist ID'
          )
          res.status(400).json({ message: 'Missing Playlist ID' })
          return
        }

        addTracksToPlaylist(accessToken, playlistId, uris)
          .then((response) => {
            logger(
              logLevels.info,
              'Playlist created successfully',
              '/create-playlist',
              response
            )
            res.status(200).json({ message: 'Playlist created successfully' })
          })
          .catch((error) => {
            logger(logLevels.error, 'string', 'addTracksToPlaylist', error)
            res.status(500).json({ message: 'Something went wrong' })
          })
      })
      .catch((error) => {
        logger(logLevels.error, 'error', '/create-playlist', error)
        res.status(500).json({ message: 'Something went wrong' })
      })
  }
)
export default router
