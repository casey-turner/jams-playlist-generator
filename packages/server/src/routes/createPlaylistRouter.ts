import express from 'express'
import { createPlaylist } from '../controllers/createPlaylistController'
import { authenticateUser } from '../middlewares/authenticateUser'

const router = express.Router()

router.post('/create-playlist', authenticateUser, createPlaylist)

export default router
