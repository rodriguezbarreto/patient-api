import { ControllerMethod } from '../../presentation/protocols/controller-method'
import { Request, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols'

export const adaptExpress = (controllerMethod: ControllerMethod) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params
    }
    const httpResponse = await controllerMethod(httpRequest)
    res.json(httpResponse)
  }
}
