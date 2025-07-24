import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import Express from 'express'
import { ENV, ENVIRONMENTS, PORT } from './config'
import createPlaylistRouter from './routes/createPlaylistRouter'
import generatePlaylistRouter from './routes/generatePlaylistRouter'
import spotifyAuthRouter from './routes/spotifyAuthRouter'

// Create Express application
export const createApp = () => {
  const app = Express()

  app.use(cors(ENVIRONMENTS[ENV].corsOrigin))
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(spotifyAuthRouter)
  app.use(generatePlaylistRouter)
  app.use(createPlaylistRouter)
  app.get('/', (req, res) => {
    res.send('Hello Boston!')
  })

  return app
}

// Create and export the app for testing
export const app = createApp()

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT as string, () => {
    console.log(`Server running http://localhost:${PORT}`)
  })
}
