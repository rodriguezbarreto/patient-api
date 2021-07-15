import { createConnection, getConnection, getConnectionOptions } from 'typeorm'

interface connectionOptions {
  dropSchema: boolean
  logging: boolean
  host: string
  synchroize: boolean
  migrationsRun: boolean
}

export const postgres = {
  async open () {
    await getConnectionOptions().then(async options => {
      const newOptions = options as unknown as connectionOptions
      if (process.env.NODE_ENV === 'test') {
        newOptions.host = 'db_test'
        newOptions.dropSchema = true
        newOptions.logging = false
        newOptions.synchroize = true
      }
      newOptions.host = 'db'
      await createConnection({
        ...options
      })
    }).catch(err => console.log('x Unable to connect with Postgres:', err.message))
  },

  async close () {
    await getConnection().close()
  },

  async clear () {
    const connection = getConnection()
    const entities = connection.entityMetadatas
    const entityDeletionPromises = entities.map((entity) => async () => {
      const repository = connection.getRepository(entity.name)
      await repository.clear()
    })
    await Promise.all(entityDeletionPromises)
  }
}
