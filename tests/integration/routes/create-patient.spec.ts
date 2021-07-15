import app from '../../../src/infra/config/app'
import request from 'supertest'
import { postgres } from '../../../src/infra/config/database-connector'

describe.skip('Integration test Create Patient', () => {
  beforeAll(async () => {
    await postgres.open()
  })

  afterAll(async () => {
    await postgres.close()
  })

  beforeEach(async () => {
    await postgres.clear()
  })

  test('should return 201 when create new patient', async () => {
    await request(app)
      .post('/v1/patient/create')
      .send({
        name: 'Daniel',
        phone: '48123456789',
        gender: 'male',
        birthDate: '28/03/50',
        height: 175
      })
      .expect(201)
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
      .expect(400)
  })
})
