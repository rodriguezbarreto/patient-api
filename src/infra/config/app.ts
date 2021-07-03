import setupMiddlewares from './middlewares-config'
import setupRoutes from './routes-config'
import express from 'express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app
