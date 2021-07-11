import { Connection } from 'typeorm'
import { connectionDB } from '../../../src/infra/config/connectorDB'
import { ListPatientPostgresRepository } from '../../../src/infra/database'
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
  test('should return patients list', async () => {
    connection.createQueryBuilder()
      .insert()
      .into(PatientModel)
      .values([
        {
          name: 'Daniel',
          birthDate: '28/02/1988',
          phone: '48996366726',
          height: 180,
          weight: 98.6
        },
        {
          name: 'Fabio',
          birthDate: '28/02/1988',
          phone: '48996366745',
          height: 170,
          weight: 95.6
        }
      ])
      .execute()

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
