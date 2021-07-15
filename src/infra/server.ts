import app from '../infra/config/app'
import { postgres } from './config/database-connector'

postgres.open().then(() => console.log('✓ Connection with Postgres: ON'))

const PORT = 4000
const server = app.listen(PORT, () => {
  console.log(`✓ Server UP: http://localhost:${PORT}`)
})

process.on('SIGINT', () => {
  server.close()
  postgres.close()
  console.log('\nx Server down')
  console.log('x Connection with Postgres: OFF')
})
