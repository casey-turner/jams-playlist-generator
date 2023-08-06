import dotenv from 'dotenv'
dotenv.config()

type EnvironmentSettings = {
  cookieSettings: {
    path: string
    domain?: string
    httpOnly: boolean
    secure?: boolean
    sameSite?: 'none'
  }
  corsOrigin: {
    origin: string
    credentials: boolean
  }
}

const ENV = process.env.NODE_ENV || 'development'
const DOMAIN = process.env.DOMAIN
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const JWT_SECRET = process.env.JWT_SECRET
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

const PORT = process.env.PORT || 3000

const ENVIRONMENTS: Record<string, EnvironmentSettings> = {
  development: {
    cookieSettings: {
      path: '/',
      domain: DOMAIN,
      httpOnly: true,
    },
    corsOrigin: { origin: CLIENT_URL, credentials: true },
  },
  production: {
    cookieSettings: {
      path: '/',
      domain: DOMAIN,
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    },
    corsOrigin: { origin: CLIENT_URL, credentials: true },
  },
}

export {
  CLIENT_URL,
  DOMAIN,
  ENV,
  ENVIRONMENTS,
  JWT_SECRET,
  OPENAI_API_KEY,
  PORT,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
}
