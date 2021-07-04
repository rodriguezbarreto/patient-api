import { sendResponse } from '../../../src/presentation/utils-presentation'
import { dataMock, successSendResponseMock } from './mocks/send-response-mock'

describe('Send Response Utils', () => {
  test('should return default error message', () => {
    const result = sendResponse(500)
    expect(result.error).toEqual('Internal Server Error')
  })

  test('should return custom error message', () => {
    const dataErrorMessageMock = 'Promisse Reject'
    const result = sendResponse(500, dataErrorMessageMock)
    expect(result.error).toEqual(dataErrorMessageMock)
  })

  test('Should returt status 200 and data', () => {
    const result = sendResponse(200, dataMock)
    expect(result).toEqual(successSendResponseMock)
  })
})
