import { Connection, createConnection, getConnection } from 'typeorm'

export const database = {
  postgres: async (): Promise<void> => {
    try {
      const connection = await createConnection()
      console.log(`✔ Connection with Postgres: ON (database: ${connection.options.database})`)
      process.on('SIGINT', async () => await connection.close().then(() => console.log('🛑 Connection with Postgres database: OFF')))
    } catch (err) {
      console.log(`✘ Unable connect to postgres database: ${err.message}`)
    }
  }
}

export const databaseForTests = {
  postgres: async (): Promise<Connection> => {
    return await createConnection()
  }
}

export const clear = async (): Promise<void> => {
  const connection = getConnection()
  const entities = connection.entityMetadatas
  const entityDeletionPromises = entities.map((entity) => async () => {
    const repository = connection.getRepository(entity.name)
    await repository.clear()
  })
  await Promise.all(entityDeletionPromises)
}
