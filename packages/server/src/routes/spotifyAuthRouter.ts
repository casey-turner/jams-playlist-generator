import express from 'express'
import { spotifyApi, spotifyTokenApi } from '../apis/spotifyApi'
import { SPOTIFY_REDIRECT_URI } from '../config'
import { connect } from '../controllers/spotifyAuthController'
import { generateToken } from '../utils/generateToken'
import { logLevels, logger } from '../utils/logger'
const router = express.Router()

// Define routes
router.get('/connect', connect)

router.get('/callback', (req, res) => {
  const code = req.query.code || null

  spotifyTokenApi
    .post('', {
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code',
    })
    .then((response) => {
      if (response.status === 200) {
        const accessToken = response.data.access_token
        const refreshToken = response.data.refresh_token
        const expiresIn = response.data.expires_in
        // console.log('access token', accessToken)
        // get the users spotify profile id
        spotifyApi
          .get('/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            const userId = response.data.id
            const timestamp = Date.now()
            // Generate a JWT for the user
            const token = generateToken(
              { accessToken, refreshToken, expiresIn, timestamp, userId },
              'some-secret'
            )
            // Set the JWT in a cookie or in the response body
            res.cookie('spotify', token)
            res.redirect('http://localhost:5173')
          })
          .catch((error) => {
            logger(logLevels.error, error.message, '/me', error)
            res.status(500)
          })
      } else {
        logger(logLevels.error, 'something', '/callback', 'something')
        res.status(500)
      }
    })
    .catch((error) => {
      logger(logLevels.error, error, '/callback', error)
      res.status(500)
    })
})

export default router
