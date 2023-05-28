import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'
dotenv.config()

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const JWT_SECRET: Secret | undefined = process.env.JWT_SECRET
const CLIENT_URL = process.env.CLIENT_URL
const PORT = process.env.PORT || 3000

export {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  OPENAI_API_KEY,
  JWT_SECRET,
  CLIENT_URL,
  PORT,
}
