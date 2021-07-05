import app from '../infra/config/app'
import { connectionPostgres } from './database'

connectionPostgres()

const PORT = 4006
const server = app.listen(PORT, () => {
  console.log(`--> Server: ON (listening port: ${PORT})`)
})

process.on('SIGINT', () => {
  server.close()
  console.log('\n--> Server: OFF')
})
