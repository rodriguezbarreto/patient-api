import request from 'supertest'
import { getConnection } from 'typeorm'
import app from '../../../src/infra/config/app'
import { postgres } from '../../../src/infra/config/database-connector'
import { PatientModel } from '../../../src/infra/libs'

const fakeList = [
  {
    name: 'Daniel',
    birthDate: '28/02/1988',
    phone: '48996366726',
    gender: 'male',
    height: 180,
    weight: 98.6
  },
  {
    name: 'Fabio',
    birthDate: '28/02/1988',
    phone: '48996366745',
    gender: 'male',
    height: 170,
    weight: 95.6
  }
]

describe('Integration test List Patient', () => {
  beforeAll(async () => {
    await postgres.open()
  })

  afterAll(async () => {
    await postgres.close()
  })

  beforeEach(async () => {
    await postgres.clear()
  })

  test('should return 200 and "no registered patient"', async () => {
    await request(app)
      .get('/v1/patient/list')
      .expect({
        success: true,
        statusCode: 200,
        data: 'no registered patient',
        error: null
      })
  })

  test('should return list patients', async () => {
    const repo = getConnection().getRepository(PatientModel)
    await repo.save(fakeList)
    const response = await request(app).get('/v1/patient/list')
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Daniel' }),
      expect.objectContaining({ name: 'Fabio' })
    ]))
  })
})
