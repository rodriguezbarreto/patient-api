import app from '../../src/infra/config/app'
import request from 'supertest'
import { Connection } from 'typeorm'
import { connectionDB } from '../../src/infra/config/connectorDB'

let connection: Connection
describe.skip('Integration test Create Patient', () => {
  beforeAll(async () => {
    connection = await connectionDB.postgresForTest()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  test('should return 201 when create new patient', async () => {
    await request(app)
      .post('/v1/patient/create')
      .send({
        name: 'Daniel',
        phone: '48123456789',
        gender: 'male',
        birthDate: '28/03/50',
        height: 175,
        weight: 80
      })
      .expect(201)
  })
})
