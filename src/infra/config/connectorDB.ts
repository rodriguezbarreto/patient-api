import { Connection, createConnection } from 'typeorm'

export const connectionDB = {
  postsgres: async (): Promise<void> => {
    try {
      const connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'postgres',
        database: 'pebmedapi', // todo: add as variable in .env file
        entities: ['./src/infra/database/postgres/models/*.ts'],
        migrations: ['./src/infra/database/postgres/migrations/*.ts'],
        cli: {
          migrationsDir: '../database/postgres/migrations/*.ts'
        }
      })
      console.log(`✔ Connection with Postgres: ON (database: ${connection.options.database})`)
      process.on('SIGINT', async () => await connection.close().then(() => console.log('🛑 Connection with Postgres database: OFF')))
    } catch (err) {
      console.log(`✘ Unable connect to postgres database: ${err.message}`)
    }
  },
  postgresForTest: async (): Promise<Connection> => {
    return await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'pebmedapi', // todo: add as variable in .env file
      entities: ['./src/infra/database/postgres/models/*.ts'],
      migrations: ['./src/infra/database/postgres/migrations/*.ts'],
      cli: {
        migrationsDir: '../database/postgres/migrations/*.ts'
      }
    })
  }
}
