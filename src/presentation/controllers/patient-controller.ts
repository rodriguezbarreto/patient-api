import { HttpResponse, HttpRequest, Controller } from '../protocols'
import { sendResponse, fieldsValidator } from '../utils-presentation'
import { patientFields } from '../models-fields'
import { CreatePatient, ListPatients, UpdatePatient, DeletePatient } from '../../domain'

export class CreatePatientController implements Controller {
  constructor (private readonly createService: CreatePatient) {}

  async service (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = fieldsValidator(patientFields, request.body)
      if (error) return sendResponse(400, error)
      const newPatients = await this.createService.create(request.body)
      return newPatients ? sendResponse(201) : sendResponse(400)
    } catch (err) {
      return sendResponse(500, err.message)
    }
  }
}

export class ListPatientsController implements Controller {
  constructor (private readonly listService: ListPatients) {}

  async service (request: HttpRequest): Promise<HttpResponse> {
    try {
      const listPatients = await this.listService.list()
      if (listPatients.length > 0) return sendResponse(200, listPatients)
      return sendResponse(200, 'no registered patient')
    } catch (err) {
      return sendResponse(500, err.message)
    }
  }
}

export class UpdatePatientController implements Controller {
  constructor (private readonly updateService: UpdatePatient) {}

  async service (request: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.updateService.update(request.body, request.params.id)
      return result ? sendResponse(200) : sendResponse(400)
    } catch (err) {
      return sendResponse(500, err.message)
    }
  }
}

export class DeletePatientController implements Controller {
  constructor (private readonly deleteService: DeletePatient) {}

  async service (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params
      const result = await this.deleteService.delete(id)
      return result ? sendResponse(200) : sendResponse(400)
    } catch (err) {}
  }
}
