import { Connection } from 'typeorm'
import { databaseForTests, clear } from '../../../src/infra/config/database-connector'
import { UpdatePatientPostgresRespositrory } from '../../../src/infra/database'
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
let connection: Connection

describe('Patient Postgres Respository', () => {
  beforeAll(async () => {
    connection = await databaseForTests.postgres()
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    await clear()
  })

  test('should call updatePatient with correct values', async () => {
    const sut = new UpdatePatientPostgresRespositrory()
    const repositorySpy = jest.spyOn(sut, 'updatePatient')
    await sut.updatePatient(fake.updates, wrongId)
    expect(repositorySpy).toHaveBeenCalledWith(fake.updates, wrongId)
  })

  test('should return false when not find patient', async () => {
    const sut = new UpdatePatientPostgresRespositrory()
    await sut.updatePatient(fake.updates, wrongId)
    expect(false)
  })

  test('should return true when updating patient', async () => {
    const repo = connection.getRepository(PatientModel)
    await repo.save(fake.insert)
    const patient = await repo.findOne({ where: { name: 'Daniel' } })
    const sut = new UpdatePatientPostgresRespositrory()
    await sut.updatePatient(fake.updates, patient.id)
    expect(true)
  })
})
