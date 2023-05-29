import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import {
  JWT_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from '../config.js'
import { logLevels, logger } from '../utils/logger.js'

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

const refreshAccessToken = (
  refreshToken: string,
  userId: string,
  jwtSecret: any
) => {
  if (!refreshToken || refreshToken === 'undefined') {
    logger(
      logLevels.error,
      'refreshToken is missing',
      'authHelpers.js',
      'userID'
    )
    return false
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
    return false
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
          console.log('refresh token', refreshToken)
          const accessToken = response.data.access_token
          const newRefreshToken = refreshToken
          const expiresIn = response.data.expires_in
          const timestamp = Date.now()
          const newUserId = userId
          const tokenData = {
            accessToken: accessToken,
            refreshToken: newRefreshToken,
            expiresIn: expiresIn,
            timestamp: timestamp,
            userId: newUserId,
          }
          return tokenData
        } else {
          logger(
            logLevels.error,
            'refreshAccessToken status',
            'authHelpers.js',
            response.statusText
          )
          return false
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
      return false
    })
}
interface CustomRequest extends Request {
  userData: {
    accessToken: string
    refreshToken: string
    expiresIn: number
    timestamp: number
    userId: string
  }
}

const authenticateUser = async (
  req: CustomRequest,
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

    if (
      isAccessTokenExpired(
        decodedToken.timestamp as number,
        decodedToken.expiresIn as number,
        decodedToken.accessToken as string
      )
    ) {
      const newToken = await refreshAccessToken(
        decodedToken.refreshToken as string,
        decodedToken.userId as string,
        JWT_SECRET as Secret
      )
      const newTimestamp = Date.now()
      if (typeof newToken === 'object' && 'accessToken' in newToken) {
        res.cookie('hello', 'world', { maxAge: 90000000 })
        req.userData = {
          accessToken: newToken.accessToken,
          refreshToken: decodedToken.refreshToken as string,
          expiresIn: decodedToken.expiresIn as number,
          timestamp: newTimestamp,
          userId: decodedToken.userId as string,
        }
        next()
      }
    }

    req.userData = {
      accessToken: decodedToken.accessToken as string,
      refreshToken: decodedToken.refreshToken as string,
      expiresIn: decodedToken.expiresIn as number,
      timestamp: decodedToken.timestamp as number,
      userId: decodedToken.userId as string,
    }

    next()
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

// const authenticateUser =
//   (jwtSecret:  ) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log('jwtSecret', jwtSecret)
//     console.log('req', req)
//     console.log('res', res)
//     console.log('next', next)

//     const authHeader = req.headers.authorization
//     console.log('authHeader', authHeader)
// if (!authHeader) {
//   return res.status(401).json({ message: 'Authorization header missing' })
// }
// const token = authHeader.split(' ')[1]
// try {
//   const decodedToken = jwt.verify(token, jwtSecret)
//   if (
//     isAccessTokenExpired(
//       decodedToken.timestamp,
//       decodedToken.expiresIn,
//       decodedToken.accessToken
//     )
//   ) {
//     const newToken = await refreshAccessToken(
//       decodedToken.refreshToken,
//       decodedToken.userId,
//       jwtSecret
//     )
//     const newTimestamp = Date.now()
//     if (newToken) {
//       res.cookie('hello', 'world', { maxage: 90000000 })
//       req.userData = {
//         accessToken: newToken.accessToken,
//         refreshToken: decodedToken.refreshToken,
//         expiresIn: decodedToken.expiresIn,
//         timestamp: newTimestamp,
//         userId: decodedToken.userId,
//       }
//       next()
//     }
//   } else {
//     req.userData = {
//       accessToken: decodedToken.accessToken,
//       refreshToken: decodedToken.refreshToken,
//       expiresIn: decodedToken.expiresIn,
//       timestamp: decodedToken.timestamp,
//       userId: decodedToken.userId,
//     }
//     console.log('userData', req.userData)
//     next()
//   }
// } catch (error) {
//   console.log('authenticateUser error', error)
//   logger(logLevels.error, 'authenticateUser failed', 'authHelpers.js', error)
//   return res.status(401).json({ message: 'Invalid or expired token' })
// }
// }

export { authenticateUser }
