import Express from 'express'
import { bodyParser, contentType, cors } from './middlewares'

class App {
  public express: Express.Application

  constructor () {
    this.express = Express()
    this.setMiddlewares()
  }

  private setMiddlewares (): void {
    this.express.use(bodyParser)
    this.express.use(cors)
    this.express.use(contentType)
  }
}

export default new App().express
