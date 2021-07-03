import HttpStatus from 'http-status'
import HandlerPatient from '../handlers/patient-handler'
import { HttpResponse, HttpResquest } from '../protocols'

export default class PatientController {
  protected handler = new HandlerPatient()

  public async create (request: HttpResquest, response: HttpResponse): Promise<void> {
    try {
      const ret = await this.handler.create(request.body)
      response.status(ret.statusCode).send({ ret })
    } catch (err) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: err.toString()
      })
    }
  }
}
