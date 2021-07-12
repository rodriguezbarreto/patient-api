import { Router } from 'express'
import { expressAdapter } from '../adapters/express-adapter'
import { makeCreatePatientController, makeListPatientsController, makeUpdatePatientController } from '../factories/patient-contoller-factory'

export default (router: Router): void => {
  router.post('/patient/create', expressAdapter(makeCreatePatientController()))
  router.get('/patient/list', expressAdapter(makeListPatientsController()))
  router.put('/patient/update/:id', expressAdapter(makeUpdatePatientController()))
}
