import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import {
  ENV,
  ENVIRONMENTS,
  JWT_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from '../config'
import { RefreshTokenResult } from '../types/spotifyTypes'
import { generateToken } from '../utils/generateToken'
import { logLevels, logger } from '../utils/logger'

const isAccess_tokenExpired = (
  timestamp: number,
  expires_in: number,
  access_token: string
): boolean => {
  if (timestamp && expires_in && access_token) {
    const now = Date.now()
    const expiresAt = timestamp + expires_in * 1000
    return expiresAt < now
  }
  return true
}

const refreshAccessToken = (
  refreshToken: string,
  userId: string
): Promise<RefreshTokenResult | false> => {
  if (!refreshToken || refreshToken === 'undefined') {
    logger(
      logLevels.error,
      'Refresh Token is missing or undefined',
      'middlewares/authenticateUser.ts (refreshAccessToken)',
      refreshToken
    )
    return Promise.reject({ error: 'Refresh Token is missing or undefined' })
  }
  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    logger(
      logLevels.error,
      'Spotify Client ID or Spotify Client Secret is missing',
      'middlewares/authenticateUser.ts (refreshAccessToken)',
      { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET }
    )
    return Promise.reject({
      error: 'Spotify Client ID or Spotify Client Secret is missing',
    })
  }
  return axios
    .post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
    })
    .then(
      (response: {
        status: number
        data: { access_token: string; expires_in: number }
        statusText: string
      }) => {
        if (response.status === 200) {
          const access_token = response.data.access_token
          const expires_in = response.data.expires_in
          const timestamp = Date.now()
          const token = {
            access_token,
            refreshToken,
            expires_in,
            timestamp,
            userId,
          }

          return token
        } else {
          logger(
            logLevels.error,
            'refreshAccessToken status',
            'middlewares/authenticateUser.ts (refreshAccessToken)',
            response.statusText
          )
          return Promise.reject({ error: 'refreshAccessToken status' })
        }
      }
    )
    .catch((error) => {
      logger(
        logLevels.error,
        'refreshAccessToken failed',
        'middlewares/authenticateUser.ts (refreshAccessToken)',
        error
      )
      return Promise.reject({ error: 'refreshAccessToken failed' })
    })
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }
  const jamsToken = authHeader.split(' ')[1]

  const handleAuthentication = async () => {
    try {
      const decodedToken = jwt.verify(
        jamsToken,
        JWT_SECRET as Secret
      ) as JwtPayload

      if (!decodedToken) {
        return res.status(401).json({ message: 'Invalid or expired token' })
      }

      let newToken
      if (
        isAccess_tokenExpired(
          decodedToken.timestamp as number,
          decodedToken.expires_in as number,
          decodedToken.access_token as string
        )
      ) {
        newToken = await refreshAccessToken(
          decodedToken.refreshToken as string,
          decodedToken.userId as string
        )
      }

      if (newToken) {
        console.log('newToken:', newToken)
        const newTimestamp = Date.now()
        const token = generateToken(
          {
            accessToken: newToken.access_token,
            refreshToken: decodedToken.refreshToken as string,
            expiresIn: newToken.expires_in,
            timestamp: newTimestamp,
            userId: decodedToken.userId as string,
          },
          JWT_SECRET as string
        )

        res.cookie('jams_token', token, ENVIRONMENTS[ENV].cookieSettings)
        req.spotifyAuthData = {
          access_token: newToken.access_token,
          refresh_token: decodedToken.refreshToken as string,
          expires_in: newToken.expires_in,
          timestamp: newTimestamp,
          userId: decodedToken.userId as string,
        }
      } else {
        req.spotifyAuthData = {
          access_token: decodedToken.access_token as string,
          refresh_token: decodedToken.refreshToken as string,
          expires_in: decodedToken.expires_in as number,
          timestamp: decodedToken.timestamp as number,
          userId: decodedToken.userId as string,
        }
      }

      next()
    } catch (error) {
      logger(
        logLevels.error,
        'authenticateUser failed',
        'middlewares/authenticateUser.ts (authenticateUser)',
        error
      )
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
  }

  handleAuthentication().catch((error) => {
    logger(
      logLevels.error,
      'handleAuthentication failed',
      'middlewares/authenticateUser.ts (authenticateUser)',
      error
    )
    return res.status(401).json({ message: 'Invalid or expired token' })
  })
}

export { authenticateUser }

