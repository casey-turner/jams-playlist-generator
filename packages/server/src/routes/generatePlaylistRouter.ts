import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
import { OPENAI_API_KEY } from '../config'
import { authenticateUser } from '../middlewares/authenticateUser'

const router = express.Router()
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

router.post('/playlist', authenticateUser as any, async (req, res) => {
  const { accessToken, refreshToken, expiresIn, userId } = req.userData
  const prompt = req.body.prompt

  console.log('prompt', prompt)
  console.log('accessToken', accessToken)
  console.log('refreshToken', refreshToken)
  console.log('expiresIn', expiresIn)
  console.log('userId', userId)
})

export default router
