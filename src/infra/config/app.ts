import Express from 'express'
import { bodyParser } from './middlewares/body-parse/body-parser'

class ExpressDrive {
  public app: Express.Application

  constructor () {
    this.app = Express()
    this.setMiddlewares()
  }

  private setMiddlewares (): void {
    this.app.use(bodyParser)
  }
}

export default new ExpressDrive().app
