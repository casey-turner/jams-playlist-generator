// @ts-nocheck
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import Express from 'express'
import { CLIENT_URL, PORT } from './config'
import createPlaylistRouter from './routes/createPlaylistRouter'
import generatePlaylistRouter from './routes/generatePlaylistRouter'
import spotifyAuthRouter from './routes/spotifyAuthRouter'

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
}
const app = Express()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(spotifyAuthRouter)
app.use(generatePlaylistRouter)
app.use(createPlaylistRouter)
app.get('/', (req, res) => {
  res.send('Hello Boston!')
})

app.listen(PORT, '0.0.0.0', function () {
  console.log(`Server running http://localhost:${PORT}`)
})
