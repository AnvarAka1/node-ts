import express, { json } from 'express'
import helmet from 'helmet'

import routes from './modules/routes'

const PORT = 8000

const app = express()

app.use(helmet())
app.use(json())

app.use(routes)

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Application listening on PORT =', PORT)
})

export default app
