import axios from 'axios'
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../config'

const clientId = SPOTIFY_CLIENT_ID ?? '' // Use empty string if SPOTIFY_CLIENT_ID is undefined
const clientSecret = SPOTIFY_CLIENT_SECRET ?? '' // Use empty string if SPOTIFY_CLIENT_SECRET is undefined

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

const spotifyTokenApi = axios.create({
  baseURL: 'https://accounts.spotify.com/api/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64'
    )}`,
  },
})

export { spotifyApi, spotifyTokenApi }
