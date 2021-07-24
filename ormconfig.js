module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'database_api',
    migrationsRun: true,
    entities: ['./src/infra/libs/typeorm/models/*.ts'],
    migrations: ['./src/infra/libs/typeorm/migrations/*.ts'],
    cli: {
      entitiesDir: './src/infra/libs/typeorm/models',
      migrationsDir: './src/infra/libs/typeorm/migrations/'
    }
}