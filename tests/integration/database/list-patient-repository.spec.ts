import { Connection } from 'typeorm'
import { databaseForTests, clear } from '../../../src/infra/config/database-connector'
import { ListPatientPostgresRepository } from '../../../src/infra/database'
import { PatientModel } from '../../../src/infra/libs'

let connection: Connection
const fakeListInsert = [
  {
    name: 'Daniel',
    birthDate: '28/02/1988',
    gender: 'male',
    phone: '48996366726',
    height: 180,
    weight: 98.6
  },
  {
    name: 'Fabio',
    birthDate: '28/02/1988',
    gender: 'male',
    phone: '48996366745',
    height: 170,
    weight: 95.6
  }
]

describe('List Patient Postgres Respository', () => {
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
  test('should return patients list', async () => {
    const repo = connection.getRepository(PatientModel)
    await repo.save(fakeListInsert)
    const sut = new ListPatientPostgresRepository()
    const fakePatienstList = await sut.listPatients()
    expect(fakePatienstList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Daniel' }),
        expect.objectContaining({ name: 'Fabio' })
      ])
    )
  }, 15000)

  jest.retryTimes(6)
  test('throw an exception if database return error', async () => {
    const sut = new ListPatientPostgresRepository()
    jest.spyOn(sut, 'listPatients').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.listPatients()
    expect(promise).rejects.toThrow()
  }, 15000)
})
