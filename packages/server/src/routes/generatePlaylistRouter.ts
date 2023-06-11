import express, { Request, Response } from 'express'
import { authenticateUser } from '../middlewares/authenticateUser'

const router = express.Router()

router.post(
  '/playlist',
  authenticateUser,
  (req: Request, res: Response) => {
    console.log(req.body)
    console.log(req.spotifyAuthData)
  }
)

export default router
