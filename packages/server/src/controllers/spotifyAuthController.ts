import { AxiosResponse } from 'axios'
import { Request, Response } from 'express'
import querystring from 'querystring'
import { spotifyApi, spotifyTokenApi } from '../apis/spotifyApi'
import {
  CLIENT_URL,
  ENV,
  ENVIRONMENTS,
  JWT_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
} from '../config'
import { SpotifyAuthData, SpotifyUserProfileData } from '../types/spotifyTypes'
import { generateRandomString } from '../utils/generateRandomString'
import { generateToken } from '../utils/generateToken'
import { logLevels, logger } from '../utils/logger'

const connectController = (req: Request, res: Response): void => {
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

const callbackController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const code = req.query.code as string

    const data = querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    })

    const tokenResponse: AxiosResponse<SpotifyAuthData> = await spotifyTokenApi.post('', data) 
    console.log('tokenResponse', tokenResponse.data)

    if (tokenResponse.status === 200) {
      const accessToken: string = tokenResponse.data.access_token
      const refreshToken: string = tokenResponse.data.refresh_token
      const expiresIn: number = tokenResponse.data.expires_in

      const userInfoResponse: AxiosResponse<SpotifyUserProfileData> = await spotifyApi.get('/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const userId: string = userInfoResponse.data.id
      const timestamp = Date.now()
      const token = generateToken(
        { accessToken, refreshToken, expiresIn, timestamp, userId },
        JWT_SECRET as string
      )

      res.cookie('jams_token', token, ENVIRONMENTS[ENV].cookieSettings)
      res.redirect(`${CLIENT_URL}/generate-playlist`)
    } else {
      logger(logLevels.error, 'token response failed', '/callback', tokenResponse)
      res.status(500).send()
    }
  } catch (error) {
    logger(logLevels.error, 'error', '/callback', error)
    res.status(500).send()
  }
}

export { callbackController, connectController }

