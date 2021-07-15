import { getConnection } from 'typeorm'
import { postgres } from '../../../src/infra/config/database-connector'
import { CreatePatientPostgresRespository } from '../../../src/infra/database'
import { PatientModel } from '../../../src/infra/libs'

const fake = {
  insert1: {
    name: 'Daniel',
    birthDate: '28/02/1988',
    gender: 'male',
    phone: '48996366726',
    height: 180,
    weight: 98.6
  },
  insert2: {
    name: 'Fabio',
    birthDate: '28/02/1988',
    gender: 'male',
    phone: '489999999',
    height: 180,
    weight: 98.6
  }
}

describe('Patient Postgres Respository', () => {
  beforeAll(async () => {
    await postgres.open()
  })

  afterAll(async () => {
    await postgres.close()
  })

  beforeEach(async () => {
    await postgres.clear()
  })

  test('should return false when there is already a patient with the same phone', async () => {
    const repo = getConnection().getRepository(PatientModel)
    await repo.save(fake.insert1)
    const sut = new CreatePatientPostgresRespository()
    const fakeNewPatient = await sut.createPatient(fake.insert1)
    expect(fakeNewPatient).toBe(false)
  })

  test('should return true when the new patient is created', async () => {
    const sut = new CreatePatientPostgresRespository()
    const fakeNewPatient = await sut.createPatient(fake.insert2)
    expect(fakeNewPatient).toBe(true)
  })

  test('throw an exception if database return error', async () => {
    const sut = new CreatePatientPostgresRespository()
    jest.spyOn(sut, 'createPatient').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.createPatient(fake.insert2)
    expect(promise).rejects.toThrow()
  })
})
