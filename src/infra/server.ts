import app from '../infra/config/app'
import { database } from './config/database-connector'

database.postgres().then(async connection => {
  console.log(`✔ Connection with Postgres: ON (database: ${connection.options.database})`)
  process.on('SIGINT', async () => await connection.close().then(() => console.log('🛑 Connection with Postgres database: OFF')))
})

const PORT = 4000
const server = app.listen(PORT, () => {
  console.log(`✔ Server UP: http://localhost:${PORT}`)
})

process.on('SIGINT', () => {
  server.close()
  console.log('\n🛑 Server: OFF')
})
