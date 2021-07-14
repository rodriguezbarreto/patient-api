module.exports = {
    type: 'postgres',
    host: process.env.NODE_ENV==='test'? 'db_test': 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: process.env.NODE_ENV==='test'? 'pebmedapi_test': 'pebmedapi',
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