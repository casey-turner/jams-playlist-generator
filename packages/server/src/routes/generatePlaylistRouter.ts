import express from 'express'
import { generatePlaylist } from '../controllers/generatePlaylistController'
import { authenticateUser } from '../middlewares/authenticateUser'

const router = express.Router()

router.post('/playlist', authenticateUser, generatePlaylist)

export default router
