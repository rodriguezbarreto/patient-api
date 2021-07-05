import { createConnection } from 'typeorm'

export const connectionPostgres = async (): Promise<void> => {
  const connection = await createConnection()
  console.log(`--> Connection with database: ON (database: ${connection.options.database})`)

  process.on('SIGINT', async () => await connection.close().then(() => console.log('--> Connection with database: OFF')))
}
