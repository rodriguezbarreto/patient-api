import { HttpResponse, HttpRequest, Controller } from '../protocols'
import { sendResponse, fieldsValidator } from '../utils-presentation'
import { patientFields } from '../models-fields'
import { CreatePatient } from '../../domain'

export default class CreatePatientController implements Controller {
  constructor (private readonly createService: CreatePatient) {}

  public async service (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = fieldsValidator(patientFields, request.body)
      if (error) return sendResponse(400, error)
      const newPatient = await this.createService.create(request.body)
      return newPatient ? sendResponse(200) : sendResponse(400)
    } catch (err) {
      return sendResponse(500, err.message)
    }
  }
}
