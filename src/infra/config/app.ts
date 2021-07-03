import Express from 'express'
import { bodyParser, cors } from './middlewares'

class App {
  public express: Express.Application

  constructor () {
    this.express = Express()
    this.setMiddlewares()
  }

  private setMiddlewares (): void {
    this.express.use(bodyParser)
    this.express.use(cors)
  }
}

export default new App().express
