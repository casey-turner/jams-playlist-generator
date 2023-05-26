import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import Express from 'express'
import { PORT } from './config'
import spotifyAuthRouter from './routes/spotifyAuthRouter'

const corsOptions = {
  origin: 'http://localhost:5173',
}
const app = Express()

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/', spotifyAuthRouter)

app.listen(PORT as string, () => {
  console.log(`Server running http://localhost:${PORT}`)
})
