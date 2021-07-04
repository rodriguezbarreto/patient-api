import PatientController from '../../../src/presentation/controllers/patient-controller'
import { paramErrorRequest, paramErrorResponse } from './mocks/patient-controller-mock'

describe('Patient Cotroller', () => {
  const sut = new PatientController()

  test('Should return status 400 and what field is required', async () => {
    const result = await sut.create(paramErrorRequest)
    expect(result).toEqual(paramErrorResponse)
  })
})
