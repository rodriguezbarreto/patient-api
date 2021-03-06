import { getConnection } from 'typeorm'
import { postgres } from '../../../src/infra/config/database-connector'
import { ListPatientPostgresRepository } from '../../../src/infra/database'
import { PatientModel } from '../../../src/infra/libs'

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
    await postgres.open()
  })

  afterAll(async () => {
    await postgres.close()
  })

  beforeEach(async () => {
    await postgres.clear()
  })

  test('should return patients list', async () => {
    const repo = getConnection().getRepository(PatientModel)
    await repo.save(fakeListInsert)
    const sut = new ListPatientPostgresRepository()
    const fakePatienstList = await sut.listPatients()
    expect(fakePatienstList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Daniel' }),
        expect.objectContaining({ name: 'Fabio' })
      ])
    )
  })

  test('throw an exception if database return error', async () => {
    const sut = new ListPatientPostgresRepository()
    jest.spyOn(sut, 'listPatients').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.listPatients()
    expect(promise).rejects.toThrow()
  })
})
