import { Connection, createConnection, QueryRunner } from 'typeorm'

import seeds from 'src/seed'

import { TEST_CONNECTION_NAME } from './connection'

let connection: Connection
let queryRunner: QueryRunner

beforeAll(async () => {
  connection = await createConnection(TEST_CONNECTION_NAME)
  // queryRunner = connection.createQueryRunner('master')
  // await queryRunner.clearDatabase()
  await seeds(TEST_CONNECTION_NAME)
})

beforeEach(async () => {
  await seeds(TEST_CONNECTION_NAME)
})

afterEach(async () => {
  // await queryRunner.clearDatabase()
})

afterAll(async () => {
  await connection.close()
})

// TODO drop all tables in db afterAll
//  finish beforeAll
