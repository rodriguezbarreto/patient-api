import Express from 'express'
import { bodyParser } from './middlewares/body-parse/body-parser'

class App {
  public express: Express.Application

  constructor () {
    this.express = Express()
    this.setMiddlewares()
  }

  private setMiddlewares (): void {
    this.express.use(bodyParser)
  }
}

export default new App().express
