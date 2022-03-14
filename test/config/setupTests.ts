import { Connection, createConnection, getConnectionOptions, QueryRunner } from 'typeorm'

import seeds from 'src/seed'

import { TEST_CONNECTION_NAME } from './connection'

let connection: Connection
let queryRunner: QueryRunner

beforeAll(async () => {
  const connectionOptions = await getConnectionOptions(TEST_CONNECTION_NAME)
  connection = await createConnection({ ...connectionOptions, name: 'default' })
  queryRunner = connection.createQueryRunner('master')
  await seeds()
})

beforeEach(async () => {
  await seeds()
})

afterAll(async () => {
  await queryRunner.clearDatabase()
  await connection.close()
  await new Promise(resolve => setTimeout(() => resolve(''), 500))
})
