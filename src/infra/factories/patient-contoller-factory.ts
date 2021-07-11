
import { CreatePatientService } from '../../data'
import PatientController from '../../presentation/controllers/create-patient-controller'
import { PatientPostgresRespository } from '../database'

export const makeMethodCreatePatient = (): any => {
  const repository = new PatientPostgresRespository()
  const service = new CreatePatientService(repository)
  return new PatientController(service)
}
