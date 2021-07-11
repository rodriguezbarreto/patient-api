
import { CreatePatientService } from '../../data'
import { CreatePatientController } from '../../presentation/controllers/patient-controller'
import { CreatePatientPostgresRespository } from '../database'

export const makeCreatePatientController = (): any => {
  const repository = new CreatePatientPostgresRespository()
  const service = new CreatePatientService(repository)
  return new CreatePatientController(service)
}
