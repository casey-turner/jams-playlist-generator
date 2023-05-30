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
  console.log(req)
})

export default router
