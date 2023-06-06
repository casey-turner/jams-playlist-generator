// @ts-nocheck
import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { JWT_SECRET, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../config'
import { generateToken } from '../utils/generateToken'
import { logLevels, logger } from '../utils/logger'

const isAccessTokenExpired = (
  timestamp: number,
  expiresIn: number,
  accessToken: string
) => {
  if (timestamp && expiresIn && accessToken) {
    const now = Date.now()
    const expiresAt = timestamp + expiresIn * 1000
    return expiresAt > now
  }
  return true
}

interface RefreshTokenResult {
  accessToken?: string
  error?: string
}

const refreshAccessToken = (
  refreshToken: string,
  userId: string,
  jwtSecret: any
): Promise<RefreshTokenResult | false> => {
  if (!refreshToken || refreshToken === 'undefined') {
    logger(
      logLevels.error,
      'refreshToken is missing',
      'authHelpers.js',
      'userID'
    )
    return Promise.reject({ error: 'refreshToken is missing' })
  }
  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    logger(
      logLevels.error,
      'Client ID or secret is missing',
      'authHelpers.js',
      'data'
    )
    return Promise.reject({ error: 'Client ID or secret is missing' })
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
            'authHelpers.js',
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
        'authHelpers.js',
        'message'
      )
      return Promise.reject({ error: 'refreshAccessToken failed' })
    })
}

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  console.log('authHeader', authHeader)
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET as Secret) as JwtPayload

    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }

    if (
      !isAccessTokenExpired(
        decodedToken.timestamp as number,
        decodedToken.expiresIn as number,
        decodedToken.accessToken as string
      )
    ) {
      req.spotifyAuthData = {
        accessToken: decodedToken.accessToken as string,
        refreshToken: decodedToken.refreshToken as string,
        expiresIn: decodedToken.expiresIn as number,
        timestamp: decodedToken.timestamp as number,
        userId: decodedToken.userId as string,
      }

      next()
    }

    const newToken: RefreshTokenResult | false = await refreshAccessToken(
      decodedToken.refreshToken as string,
      decodedToken.userId as string,
      JWT_SECRET as Secret
    )
    const newTimestamp = Date.now()
    if (typeof newToken === 'object' && 'accessToken' in newToken) {
      const token = generateToken(
        {
          accessToken: newToken.accessToken as string,
          refreshToken: decodedToken.refreshToken as string,
          expiresIn: decodedToken.expiresIn as number,
          timestamp: newTimestamp,
          userId: decodedToken.userId as string,
        },
        JWT_SECRET as string
      )
      res.cookie('spotify', token)
      req.spotifyAuthData = {
        accessToken: newToken.accessToken as string,
        refreshToken: decodedToken.refreshToken as string,
        expiresIn: decodedToken.expiresIn as number,
        timestamp: newTimestamp,
        userId: decodedToken.userId as string,
      }
      next()
    }
  } catch (error) {
    console.log('authenticateUser error', error)
    logger(
      logLevels.error,
      'authenticateUser failed',
      'authHelpers.js',
      'error'
    )
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export { authenticateUser }
