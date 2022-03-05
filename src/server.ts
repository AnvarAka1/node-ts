import { createConnection } from 'typeorm'

import seeds from 'src/seed'

import app from './app'

(async function () {
  await createConnection()
  await seeds()
})()

const PORT = 8000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Application listening on PORT =', PORT)
})
