import HandlerPatient from '../handlers/patient-handler'
import { HttpResponse, HttpRequest } from '../protocols'

export default class PatientController {
  protected handler = new HandlerPatient()

  public async create (request: HttpRequest): Promise<HttpResponse> {
    return {
      success: true,
      statusCode: 200,
      data: 'any',
      error: 'any'
    }
  }
}
