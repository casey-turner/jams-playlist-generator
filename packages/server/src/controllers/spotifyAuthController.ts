import { Request, Response } from 'express'
import querystring from 'querystring'
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '../config'
import { generateRandomString } from '../utils/generateRandomString'
import { logLevels, logger } from '../utils/logger'

const connect = (req: Request, res: Response): void => {
  const scopes =
    'user-read-private user-read-email playlist-modify-public playlist-modify-private'
  const state = generateRandomString(16)

  try {
    const redirectUrl =
      'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: scopes,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        state: state,
      })

    res.redirect(redirectUrl)
  } catch (error) {
    logger(logLevels.error, 'Error in /connect', __filename, 'error')
    res.status(500)
  }
}

export { connect }
