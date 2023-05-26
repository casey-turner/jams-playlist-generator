import express from 'express'
import { connect } from '../controllers/spotifyAuthController'

const router = express.Router()

// Define routes
router.get('/connect', connect)

export default router
