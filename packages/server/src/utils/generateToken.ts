import jwt from 'jsonwebtoken'

interface User {
  accessToken: string
  refreshToken: string
  expiresIn: number
  timestamp: number
  userId: string
}

const generateToken = (user: User, jwtSecret: string): string => {
  const token: string = jwt.sign(
    {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      expiresIn: user.expiresIn,
      timestamp: user.timestamp,
      userId: user.userId,
    },
    jwtSecret,
    { expiresIn: '3h' } // (Optional) Set an expiration time for the token
  )
  return token
}

export { generateToken }
