import axios from 'axios'
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../config'

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

const spotifyTokenApi = axios.create({
  baseURL: 'https://accounts.spotify.com/api/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
    ).toString('base64')}`,
  },
})

export { spotifyApi, spotifyTokenApi }
