import Express from 'express'
import { PORT } from './config'

const app = Express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT as string, () => {
  console.log(`Server running http://localhost:${PORT}`)
})
