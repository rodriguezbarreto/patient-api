import { ControllerMethod, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const expressAdapter = (controllerMethod: ControllerMethod) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params
    }
    const httpResponse = await controllerMethod(httpRequest)
    res.json(httpResponse)
  }
}
