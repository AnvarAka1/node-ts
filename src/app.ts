import 'dotenv/config'
import 'reflect-metadata'
import express, { json } from 'express'
import helmet from 'helmet'
import { createConnection } from 'typeorm'

import routes from './modules/routes'

const PORT = 8000

createConnection()
const app = express()

app.use(helmet())
app.use(json())

app.use(routes)

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Application listening on PORT =', PORT)
})

export default app
