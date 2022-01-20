import express from 'express'
import helmet from 'helmet'
import routes from './modules/routes'
const PORT = 8000

const app = express()

app.use(helmet())
app.use(express.json())

app.use(routes)

app.listen(8000, () => {
  console.log('Application listening on PORT =', PORT)
})

export default app
