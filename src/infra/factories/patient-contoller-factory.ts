
import { CreatePatientService } from '../../data'
import PatientController from '../../presentation/controllers/create-patient-controller'
import { CreatePatientPostgresRespository } from '../database'

export const makeCreatePatientController = (): any => {
  const repository = new CreatePatientPostgresRespository()
  const service = new CreatePatientService(repository)
  return new PatientController(service)
}
