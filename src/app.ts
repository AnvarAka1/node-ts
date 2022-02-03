import 'dotenv/config'
import 'reflect-metadata'
import express, { json, NextFunction, Request, Response, urlencoded } from 'express'
import helmet from 'helmet'
import { createConnection } from 'typeorm'
import cookieParser from 'cookie-parser'

import seeds from './seed'
import routes from './modules/routes'

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

app.use(function (err: Record<string, unknown>, req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.error(err.stack)
  res.status(500).send({ err: err.message })
})

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Application listening on PORT =', PORT)
})

export default app
