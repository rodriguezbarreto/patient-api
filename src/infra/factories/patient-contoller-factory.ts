
import { CreatePatientService, ListPatientsService, UpdatePatientService, DeletePatientService } from '../../data'
import { CreatePatientController, ListPatientsController, UpdatePatientController, DeletePatientController } from '../../presentation/controllers/patient-controller'
import { CreatePatientPostgresRespository, ListPatientPostgresRepository, UpdatePatientPostgresRespositrory, DeletePatientPostgresRepository } from '../database'
import { Controller } from '../../presentation/protocols'

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

export const makeUpdatePatientController = (): Controller => {
  const repository = new UpdatePatientPostgresRespositrory()
  const service = new UpdatePatientService(repository)
  return new UpdatePatientController(service)
}

export const makeDeletePatientController = (): Controller => {
  const repository = new DeletePatientPostgresRepository()
  const service = new DeletePatientService(repository)
  return new DeletePatientController(service)
}
