import 'dotenv/config'
import 'reflect-metadata'
import express, { json, NextFunction, Request, Response, urlencoded } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import expressStatusMonitor from 'express-status-monitor'

import routes from './modules'

const app = express()

app.use(expressStatusMonitor())
app.use(cookieParser())
app.use(helmet())
//
app.use(urlencoded({ extended: true }))
app.use(json())

app.use((req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log(req.body)
  next()
})

app.use(routes)
console.log('I am running, man')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: Record<string, unknown>, req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.error('error', err)
  // eslint-disable-next-line no-console
  console.error('error stack', err.stack)
  const errorMessage = err || 'Internal server error.'
  res.status(500).send({ err: errorMessage })
})

export default app
