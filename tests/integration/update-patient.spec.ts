import app from '../../src/infra/config/app'
import request from 'supertest'
import { Connection } from 'typeorm'
import { connectionDB } from '../../src/infra/config/connectorDB'
import { PatientModel } from '../../src/infra/libs'

let connection: Connection
const wrongId = 'cf302c12-9d9a-4bad-87ff-c0a5c12637d8'
const fake = {
  insert: {
    name: 'Daniel',
    birthDate: '28/02/1988',
    gender: 'male',
    phone: '48996366726',
    height: 180,
    weight: 98.6
  }
}

describe('Integration test Create Patient', () => {
  beforeAll(async () => {
    connection = await connectionDB.postgresForTest()
    await connection.runMigrations()
  }, 1000)

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  }, 10000)

  test('should return 400 when not find patient', async () => {
    await request(app)
      .put(`/v1/patient/update/${wrongId}`)
      .send(fake.insert)
      .expect(400)
  })
  test('should return 200 when updating patient', async () => {
    const repo = connection.getRepository(PatientModel)
    await repo.save(fake.insert)
    const patient = await repo.findOne({ where: { name: 'Daniel' } })
    await request(app)
      .put(`/v1/patient/update/${patient.id}`)
      .send(patient)
      .expect(200)
  })
})
