//@ts-nocheck
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

router.get('/logout', (req, res) => {
  console.log('logout')
  res.cookie('jams_token', '', {
    ...ENVIRONMENTS[ENV].cookieSettings,
    expires: new Date(Date.now()),
  })
  console.log('after logout')
})

router.get('/check-auth', (req, res) => {
  req.cookies.jams_token
    ? res.status(200).send({ isAuthenticated: true })
    : res.status(200).send({ isAuthenticated: false })
})
export default router
