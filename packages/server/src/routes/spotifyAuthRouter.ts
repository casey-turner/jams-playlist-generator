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
  res.clearCookie('jams_token', ENVIRONMENTS[ENV].cookieSetting)
  res.status(200)
})

router.get('/check-auth', (req, res) => {
  req.cookies.jams_token
    ? res.status(200).send({ isAuthenticated: true })
    : res.status(200).send({ isAuthenticated: false })
})
export default router
