import 'dotenv/config'
import 'reflect-metadata'
import express, { json, NextFunction, Request, Response, urlencoded } from 'express'
import helmet from 'helmet'
import { createConnection } from 'typeorm'
import cookieParser from 'cookie-parser'

import seeds from './seed'
import routes from './modules'

const PORT = 8000;

(async function () {
  await createConnection()
  await seeds()
})()

const app = express()

app.use(cookieParser())
app.use(helmet())

app.use(urlencoded({ extended: true }))
app.use(json())

app.use((req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log(req.body)
  next()
})

app.use(routes)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: Record<string, unknown>, req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.error(err.stack)
  const errorMessage = 'Internal server error.'
  res.status(500).send({ err: errorMessage })
})

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Application listening on PORT =', PORT)
})

export default app
