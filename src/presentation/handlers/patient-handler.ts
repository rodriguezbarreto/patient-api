import httpStatus from 'http-status'
import { ResponseHandler } from '../protocols/http'
import { Patient } from '../../domain/entities/patient'
import fieldsValidator from '../../infra/helpers/fields-validator'
import { sendResponse } from '../../infra/helpers/send-response'
import { patientFields } from '../models-fields/patient-fields'

export default class PatientHandler {
  public async create (data: Patient): Promise<ResponseHandler> {
    const error = fieldsValidator(patientFields, data)
    if (error) return sendResponse(httpStatus.BAD_REQUEST, error.message)
  }
}
