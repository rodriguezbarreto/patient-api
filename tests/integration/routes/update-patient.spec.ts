import app from '../../../src/infra/config/app'
import request from 'supertest'
import { getConnection } from 'typeorm'
import { postgres } from '../../../src/infra/config/database-connector'
import { PatientModel } from '../../../src/infra/libs'

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

describe('Integration test Update Patient', () => {
  beforeAll(async () => {
    await postgres.open()
  })

  afterAll(async () => {
    await postgres.close()
  })

  beforeEach(async () => {
    await postgres.clear()
  })

  test('should return 400 when not find patient', async () => {
    await request(app)
      .put(`/v1/patient/update/${wrongId}`)
      .send(fake.insert)
      .expect(400)
  })

  jest.retryTimes(6)
  test('should return 200 when updating patient', async () => {
    const repo = getConnection().getRepository(PatientModel)
    await repo.save(fake.insert)
    const patient = await repo.findOne({ where: { name: 'Daniel' } })
    await request(app)
      .put(`/v1/patient/update/${patient.id}`)
      .send(patient)
      .expect(200)
  })
})
