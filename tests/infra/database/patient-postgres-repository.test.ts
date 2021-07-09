import { Connection } from 'typeorm'
import { connectionDB } from '../../../src/infra/config/connectorDB'

let connection: Connection
describe('Patient Postgres Respository', () => {
  beforeAll(async () => {
    connection = await connectionDB.postgresForTest()
    await connection.runMigrations()
  })
  afterAll(async () => {
    await connection.close()
  })
  test('', () => {
    console.log('teste')
  })
})
