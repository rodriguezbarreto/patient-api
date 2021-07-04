import { sendResponse } from '../../../src/presentation/utils-presentation'
import { dataMock, successSendResponseMock } from './mocks/send-response-mock'

describe('Send Response Utils', () => {
  test('Should return error message: "Internal Server Error"', () => {
    const result = sendResponse(500)
    expect(result.error).toEqual('Internal Server Error')
  })

  test('Should returt status 200 and data', () => {
    const result = sendResponse(200, dataMock)
    expect(result).toEqual(successSendResponseMock)
  })
})
