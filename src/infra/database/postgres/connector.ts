import { createConnection } from 'typeorm'
import { PatientModel } from './models/patient-model'

export const connectionPostgres = async (): Promise<void> => {
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
    console.log(`--> Connection with database: ON (database: ${connection.options.database})`)
    process.on('SIGINT', async () => await connection.close().then(() => console.log('--> Connection with database: OFF')))
  } catch (err) {
    console.log(err)
  }
}
