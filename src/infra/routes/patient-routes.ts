
import { Router } from 'express'
import PatientController from '../../presentation/controllers/patient-controller'
import { expressAdapter } from '../adapters/express-adapter'

export default (router: Router): void => {
  router.get('/patient/create', expressAdapter(new PatientController().create))
}
