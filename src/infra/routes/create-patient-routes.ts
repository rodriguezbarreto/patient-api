import { Router } from 'express'
import { expressAdapter } from '../adapters/express-adapter'
import { makeMethodCreatePatient } from '../factories/patient-contoller-factory'

export default (router: Router): void => {
  router.post('/patient/create', expressAdapter(makeMethodCreatePatient()))
}
