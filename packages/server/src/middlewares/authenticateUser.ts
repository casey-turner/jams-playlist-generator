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

const isAccessTokenExpired = (
  timestamp: number,
  expiresIn: number,
  accessToken: string
): boolean => {
  if (timestamp && expiresIn && accessToken) {
    const now = Date.now()
    const expiresAt = timestamp + expiresIn * 1000
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
          const accessToken = response.data.access_token
          const expiresIn = response.data.expires_in
          const timestamp = Date.now()
          const token = {
            accessToken,
            refreshToken,
            expiresIn,
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
  const jamsToken = req.cookies.jams_token
  console.log('jamsToken:', jamsToken)

  if (!jamsToken) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }
  // const token = jamsToken.split(' ')[1]
  // const token = authHeader.split(' ')[1]

  const handleAuthentication = async () => {
    try {
      const decodedToken = jwt.verify(
        jamsToken,
        JWT_SECRET as Secret
      ) as JwtPayload

      console.log('decoded token:', decodedToken)
      if (!decodedToken) {
        return res.status(401).json({ message: 'Invalid or expired token' })
      }

      let newToken
      if (
        isAccessTokenExpired(
          decodedToken.timestamp as number,
          decodedToken.expiresIn as number,
          decodedToken.accessToken as string
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
            accessToken: newToken.accessToken,
            refreshToken: decodedToken.refreshToken as string,
            expiresIn: newToken.expiresIn,
            timestamp: newTimestamp,
            userId: decodedToken.userId as string,
          },
          JWT_SECRET as string
        )

        res.cookie('jams_token', token, ENVIRONMENTS[ENV].cookieSettings)
        req.spotifyAuthData = {
          accessToken: newToken.accessToken,
          refreshToken: decodedToken.refreshToken as string,
          expiresIn: newToken.expiresIn,
          timestamp: newTimestamp,
          userId: decodedToken.userId as string,
        }
      } else {
        req.spotifyAuthData = {
          accessToken: decodedToken.accessToken as string,
          refreshToken: decodedToken.refreshToken as string,
          expiresIn: decodedToken.expiresIn as number,
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
