module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: process.env.NODE_ENV==='test'? 5434: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'pebmedapi',
    dropSchema: true,
    logging: false,
    synchroize: true,
    migrationsRun: true,
    entities: ['./src/infra/libs/typeorm/models/*.ts'],
    migrations: ['./src/infra/libs/typeorm/migrations/*.ts'],
    cli: {
      entitiesDir: './src/infra/libs/typeorm/models',
      migrationsDir: './src/infra/libs/typeorm/migrations/'
    }
}