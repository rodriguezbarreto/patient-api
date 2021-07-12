import { Connection, getRepository } from 'typeorm'
import { connectionDB } from '../../../src/infra/config/connectorDB'
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
    connection = await connectionDB.postgresForTest()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  test('should return false when not find patient', async () => {
    const sut = new UpdatePatientPostgresRespositrory()
    await sut.updatePatient(fake.updates, wrongId)
    expect(false)
  })

  test('should return true when updating patient', async () => {
    const repo = getRepository(PatientModel)
    await repo.save(fake.insert)
    const patient = await repo.findOne({ where: { name: 'Daniel' } })
    const sut = new UpdatePatientPostgresRespositrory()
    await sut.updatePatient(fake.updates, patient.id)
    expect(true)
  })
})
