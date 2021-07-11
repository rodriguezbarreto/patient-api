import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const expressAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params
    }
    const httpResponse = await controller.service(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse)
  }
}
