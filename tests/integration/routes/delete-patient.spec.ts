import app from '../../../src/infra/config/app'
import request from 'supertest'
import { Connection } from 'typeorm'
import { database, clear } from '../../../src/infra/config/database-connector'
import { PatientModel } from '../../../src/infra/libs'

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

describe('Integration test Delete Patient', () => {
  beforeAll(async () => {
    connection = await database.postgres()
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    await clear()
  })

  test('should return 400 when not find patient', async () => {
    await request(app)
      .put(`/v1/patient/delete/${wrongId}`)
      .send(fake.insert)
      .expect(400)
  })

  jest.retryTimes(6)
  test('should return 200 when delete patient', async () => {
    const repo = connection.getRepository(PatientModel)
    await repo.save(fake.insert)
    const patient = await repo.findOne({ where: { name: 'Daniel' } })
    await request(app)
      .put(`/v1/patient/delete/${patient.id}`)
      .send(patient)
      .expect(200)
  })
})
