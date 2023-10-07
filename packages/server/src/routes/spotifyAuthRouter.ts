//@ts-nocheck
import express from 'express'
import {
  callbackController,
  connectController,
} from '../controllers/spotifyAuthController'
const router = express.Router()

// Define routes
router.get('/connect', connectController)

router.get('/callback', callbackController)

export default router
