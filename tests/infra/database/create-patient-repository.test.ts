import { Connection } from 'typeorm'
import { connectionDB } from '../../../src/infra/config/connectorDB'
import { CreatePatientPostgresRespository } from '../../../src/infra/database'
import { PatientModel } from '../../../src/infra/libs'

let connection: Connection
describe.skip('Patient Postgres Respository', () => {
  beforeEach(async () => {
    connection = await connectionDB.postgresForTest()
    await connection.runMigrations()
  })

  afterEach(async () => {
    await connection.undoLastMigration()
    await connection.close()
  })
  test('should return false when there is already a patient with the same phone', async () => {
    await connection.createQueryBuilder()
      .insert()
      .into(PatientModel).values({
        name: 'Daniel',
        birthDate: '28/02/1988',
        phone: '48996366726',
        height: 180,
        weight: 98.6
      }).execute()
    const sut = new CreatePatientPostgresRespository()
    const fakeNewPatient = await sut.createPatient({
      name: 'Daniel',
      birthDate: '28/02/1988',
      phone: '48996366726',
      height: 180,
      weight: 98.6
    })
    expect(fakeNewPatient).toBe(false)
  })

  test('should return true when there is already a patient with the same phone', async () => {
    await connection.createQueryBuilder()
      .insert()
      .into(PatientModel).values({
        name: 'Daniel',
        birthDate: '28/02/1988',
        phone: '48996366726',
        height: 180,
        weight: 98.6
      }).execute()
    const sut = new CreatePatientPostgresRespository()
    const fakeNewPatient = await sut.createPatient({
      name: 'Daniel',
      birthDate: '28/02/1988',
      phone: '48996366745',
      height: 180,
      weight: 98.6
    })
    expect(fakeNewPatient).toBe(true)
  })

  test('throw an exception if database return error', async () => {
    const sut = new CreatePatientPostgresRespository()
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
