module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: process.env.NODE_ENV==='test'?'pebmedapi_test':'pebmedapi',
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