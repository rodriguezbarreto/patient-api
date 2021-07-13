import app from '../infra/config/app'
import { database } from './config/database-connector'

database.postgres()

const PORT = 4006
const server = app.listen(PORT, () => {
  console.log(`✔ Server UP: http://localhost:${PORT}`)
})

process.on('SIGINT', () => {
  server.close()
  console.log('\n🛑 Server: OFF')
})
