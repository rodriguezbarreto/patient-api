import { Connection } from 'typeorm'
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
  test('should return true when new patient is created', async () => {
    const sut = new PatientPostgresRespository()
    const newPatient = await sut.create({
      name: 'Daniel',
      birthDate: '28/02/1988',
      phone: '48996366726',
      height: 180,
      weight: 98.6
    })
    expect(newPatient).toBe(true)
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
    const sut = new PatientPostgresRespository()
    const newPatient = await sut.create({
      name: 'Daniel',
      birthDate: '28/02/1988',
      phone: '48996366726',
      height: 180,
      weight: 98.6
    })
    expect(newPatient).toBe(false)
  })
})
