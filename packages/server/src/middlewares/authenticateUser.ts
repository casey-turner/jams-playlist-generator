import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { JWT_SECRET, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../config'
import { generateToken } from '../utils/generateToken'
import { logLevels, logger } from '../utils/logger'

 

const isAccessTokenExpired = (timestamp: number, expiresIn: number, accessToken: string): boolean => {
  if (timestamp && expiresIn && accessToken) {
    const now = Date.now()
    const expiresAt = timestamp + (expiresIn * 1000)
    return expiresAt > now
  }
  return true
}

interface RefreshTokenResult {
  accessToken?: string
  expiresIn?: number
  error?: string
}

const refreshAccessToken = (refreshToken: string) => {
  if (!refreshToken || refreshToken === 'undefined') {
    logger(logLevels.error, 'Refresh Token is missing','authHelpers.js','userID')
    return Promise.reject({ error: 'Refresh Token is missing' })
  }
  const data = {grant_type: 'refresh_token', refresh_token: refreshToken}
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    logger(logLevels.error,'Client ID or secret is missing', 'authHelpers.js', 'data')
    return Promise.reject({ error: 'Client ID or secret is missing' })
  }

  return axios.post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
    })
    .then((response: {status: number, data: { access_token: string; expires_in: number }}) => {
      // if is not 200 then return error
      if (response.status !== 200) {
        logger(logLevels.error, 'refreshAccessToken failed', 'authHelpers.js', 'response')     
        return Promise.reject({ error: response.status })
      }
      const token: RefreshTokenResult = {
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in,
      }

      return token;
    })
    .catch((error: { response: { status: number; data: { error: { message: string } } } }) => {
      logger(logLevels.error, 'refreshAccessToken failed', 'authHelpers.js', 'error')
      return Promise.reject({ error: error.response.status})
    })
}

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  console.log('authHeader', authHeader)
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET as Secret) as JwtPayload

    if (!isAccessTokenExpired( decodedToken.timestamp as number, decodedToken.expiresIn as number, decodedToken.accessToken as string )) {
      
      req.userData = {
        accessToken: decodedToken.accessToken as string,
        refreshToken: decodedToken.refreshToken as string,
        expiresIn: decodedToken.expiresIn as number,
        timestamp: decodedToken.timestamp as number,
        userId: decodedToken.userId as string,
      }
      next()
    }

    const newToken: RefreshTokenResult = await refreshAccessToken(
      decodedToken.refreshToken as string
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
      res.cookie('token', token)
      req.userData = {
        accessToken: newToken.accessToken as string,
        refreshToken: decodedToken.refreshToken as string,
        expiresIn: decodedToken.expiresIn as number,
        timestamp: newTimestamp,
        userId: decodedToken.userId as string,
      }
      next()
    }
  } catch (error) {
    logger(logLevels.error,'authenticateUser failed', 'authHelpers.js', 'error')
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export { authenticateUser }

