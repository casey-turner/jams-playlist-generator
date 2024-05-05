import express from 'express'
import { ENV, ENVIRONMENTS } from '../config'
import {
  callbackController,
  connectController,
} from '../controllers/spotifyAuthController'

const router = express.Router()

// Define routes
router.get('/connect', connectController)

router.get('/callback', callbackController)

// Logout route
router.post('/logout', (req, res) => {
  console.log('logout')
  res.cookie('jams_token', '', {
    ...ENVIRONMENTS[ENV].cookieSettings,
    expires: new Date(0),
  })
  res.status(200).send('Logged out successfully')
})

export default router
