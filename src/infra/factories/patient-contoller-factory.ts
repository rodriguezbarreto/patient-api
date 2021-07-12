
import { CreatePatientService, ListPatientsService } from '../../data'
import { CreatePatientController, ListPatientsController } from '../../presentation/controllers/patient-controller'
import { Controller } from '../../presentation/protocols'
import { CreatePatientPostgresRespository, ListPatientPostgresRepository } from '../database'

export const makeCreatePatientController = (): Controller => {
  const repository = new CreatePatientPostgresRespository()
  const service = new CreatePatientService(repository)
  return new CreatePatientController(service)
}

export const makeListPatientsController = (): Controller => {
  const repository = new ListPatientPostgresRepository()
  const service = new ListPatientsService(repository)
  return new ListPatientsController(service)
}
