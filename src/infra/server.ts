import app from '../infra/config/app'
import { connectionDB } from '../infra/config/connectorDB'

connectionDB.postsgres()

const PORT = 4006
const server = app.listen(PORT, () => {
  console.log(`✔ Server UP: http://localhost:${PORT}`)
})

process.on('SIGINT', () => {
  server.close()
  console.log('\n🛑 Server: OFF')
})
