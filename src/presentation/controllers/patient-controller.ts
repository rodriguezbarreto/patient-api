import { HttpResponse, HttpRequest } from '../protocols'
import { sendResponse, fieldsValidator } from '../utils-presentation'
import { patientFields } from '../models-fields'

export default class PatientController {
  public async create (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = fieldsValidator(patientFields, request.body)
      if (error) return sendResponse(400, error)
    } catch (err) {
      return sendResponse(500)
    }
  }
}
