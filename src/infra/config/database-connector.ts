import { Connection, createConnection, getConnection } from 'typeorm'

export const database = {
  postgres: async (): Promise<Connection> => {
    return await createConnection()
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
