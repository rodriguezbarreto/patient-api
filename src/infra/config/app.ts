import Express from 'express'

class ExpressDrive {
  public app: Express.Application

  constructor () {
    this.app = Express()
    this.setMiddlewares()
  }

  private setMiddlewares (): void {
  }
}

export default new ExpressDrive().app
