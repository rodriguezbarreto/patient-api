import { HttpResponse, HttpRequest } from '../protocols'
import { sendResponse, fieldsValidator } from '../../infra/helpers'
import { patientFields } from '../models-fields'

export default class PatientController {
  public async create (request: HttpRequest): Promise<HttpResponse> {
    const error = fieldsValidator(patientFields, request)
    if (error) return sendResponse(400, error.message)

    return {
      success: true,
      statusCode: 200,
      data: 'any',
      error: 'any'
    }
  }
}
