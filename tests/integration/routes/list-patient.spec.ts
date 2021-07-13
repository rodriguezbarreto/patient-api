import request from 'supertest'
import { Connection } from 'typeorm'
import app from '../../../src/infra/config/app'
import { databaseForTests, clear } from '../../../src/infra/config/database-connector'
import { PatientModel } from '../../../src/infra/libs'

let connection: Connection
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
    connection = await databaseForTests.postgres()
  }, 15000)

  afterAll(async () => {
    await connection.close()
  }, 15000)

  beforeEach(async () => {
    await clear()
  })

  jest.retryTimes(6)
  test('should return 200 and "no registered patient"', async () => {
    await request(app)
      .get('/v1/patient/list')
      .expect({
        success: true,
        statusCode: 200,
        data: 'no registered patient',
        error: null
      })
  }, 15000)

  jest.retryTimes(6)
  test('should return list patients', async () => {
    const repo = connection.getRepository(PatientModel)
    await repo.save(fakeList)
    const response = await request(app).get('/v1/patient/list')
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Daniel' }),
      expect.objectContaining({ name: 'Fabio' })
    ]))
  }, 15000)
})
