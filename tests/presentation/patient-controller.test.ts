import PatientController from '../../src/presentation/controllers/patient-controller'
import { paramErrorRequest, paramErrorResponse } from './mock/patient-controller-mock'

describe('Patient Cotroller', () => {
  const sut = new PatientController()
  test('Should return error bad request and what field is required', async () => {
    const result = await sut.create(paramErrorRequest)
    expect(result).toEqual(paramErrorResponse)
  })
})
