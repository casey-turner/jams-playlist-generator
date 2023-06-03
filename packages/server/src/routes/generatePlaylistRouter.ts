import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
import { OPENAI_API_KEY } from '../config'
import { authenticateUser } from '../middlewares/authenticateUser'

const router = express.Router()
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

router.post(
  '/playlist',

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line
  authenticateUser,

  (req, res) => {

    console.log(req.userData)
  }
)

export default router
