
import { Router } from 'express'
import PatientController from '../../presentation/controllers/patient-controller'
import { adaptExpress } from '../adapters/express-adapter'

export default (router: Router): void => {
  router.get('/patient/create', adaptExpress(new PatientController().create))
}
