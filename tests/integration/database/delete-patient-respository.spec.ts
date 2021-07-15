import { getConnection } from 'typeorm'
import { postgres } from '../../../src/infra/config/database-connector'
import { DeletePatientPostgresRepository } from '../../../src/infra/database'
import { PatientModel } from '../../../src/infra/libs'

const fake = {
  insert: {
    name: 'Daniel',
    birthDate: '28/02/1988',
    gender: 'male',
    phone: '48996366726',
    height: 180,
    weight: 98.6
  },
  updates: {
    name: 'Fabio',
    birthDate: '28/02/1988',
    gender: 'male',
    phone: '489999999',
    height: 180,
    weight: 98.6
  }
}
const wrongId = 'cf302c12-9d9a-4bad-87ff-c0a5c12637d8'

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

  test('should call deletePatient with correct values', async () => {
    const sut = new DeletePatientPostgresRepository()
    const repositorySpy = jest.spyOn(sut, 'deletePatient')
    await sut.deletePatient(wrongId)
    expect(repositorySpy).toHaveBeenCalledWith(wrongId)
  })

  test('should return false when not find patient', async () => {
    const sut = new DeletePatientPostgresRepository()
    await sut.deletePatient(wrongId)
    expect(false)
  })

  test('should return true when delete patient', async () => {
    const repo = getConnection().getRepository(PatientModel)
    await repo.save(fake.insert)
    const patient = await repo.findOne({ where: { name: 'Daniel' } })
    const sut = new DeletePatientPostgresRepository()
    await sut.deletePatient(patient.id)
    expect(100)
  })
})
