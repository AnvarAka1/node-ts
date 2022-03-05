import { getConnection } from 'typeorm'

export const TEST_CONNECTION_NAME = 'testing'

export const getTestingConnection = () => {
  return getConnection(TEST_CONNECTION_NAME)
}
