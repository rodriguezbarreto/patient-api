import { Connection, getRepository } from 'typeorm'
import { connectionDB } from '../../../src/infra/config/connectorDB'
import { PatientModel, PatientPostgresRespository } from '../../../src/infra/database'

let connection: Connection
describe('Patient Postgres Respository', () => {
  beforeAll(async () => {
    connection = await connectionDB.postgresForTest()
  })
  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    await connection.runMigrations()
  })

  afterEach(async () => {
    await connection.undoLastMigration()
  })
  test('should return true when there is already a patient with the same phone', async () => {
    connection.createQueryBuilder()
      .insert()
      .into(PatientModel).values({
        name: 'Daniel',
        birthDate: '28/02/1988',
        phone: '48996366726',
        height: 180,
        weight: 98.6
      }).execute()
    const sut = new PatientPostgresRespository(getRepository(PatientModel))
    const fakeNewPatient = await sut.createPatient({
      name: 'Daniel',
      birthDate: '28/02/1988',
      phone: '48996366726',
      height: 180,
      weight: 98.6
    })
    expect(fakeNewPatient).toBeTruthy()
    expect(fakeNewPatient.id).toBeTruthy()
    expect(fakeNewPatient.name).toBe(fakeNewPatient.name)
    expect(fakeNewPatient.birthDate).toBe(fakeNewPatient.birthDate)
    expect(fakeNewPatient.height).toBe(fakeNewPatient.height)
    expect(fakeNewPatient.weight).toBe(fakeNewPatient.weight)
    expect(fakeNewPatient.phone).toBe(fakeNewPatient.phone)
  })

  test('throw an exception if database return error', async () => {
    const sut = new PatientPostgresRespository(getRepository(PatientModel))
    jest.spyOn(sut, 'createPatient').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.createPatient({
      name: 'Daniel',
      birthDate: '28/02/1988',
      phone: '48996366726',
      height: 180,
      weight: 98.6
    })
    expect(promise).rejects.toThrow()
  })
})
