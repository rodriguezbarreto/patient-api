import { createConnection } from 'typeorm'
import { PatientModel } from '../database/postgres/models/patient-model'

export const connectionDB = {
  postsgres: async (): Promise<void> => {
    try {
      const connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'pebmedapi',
        entities: [PatientModel]
      })
      console.log(`✔ Connection with Postgres: ON (database: ${connection.options.database})`)
      process.on('SIGINT', async () => await connection.close().then(() => console.log('🛑 Connection with Postgres database: OFF')))
    } catch (err) {
      console.log('✘ Unable connect to postgres database')
      console.log(err)
    }
  }
}
