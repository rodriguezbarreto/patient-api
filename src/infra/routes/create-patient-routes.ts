import { Router } from 'express'
import { expressAdapter } from '../adapters/express-adapter'
import { makeCreatePatientController } from '../factories/patient-contoller-factory'

export default (router: Router): void => {
  router.post('/patient/create', expressAdapter(makeCreatePatientController()))
}
