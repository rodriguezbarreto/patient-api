import { HttpResponse } from '../../../../src/presentation/protocols'

export const dataMock = {
  info1: 'payload_test',
  info2: 'payload_test',
  info3: 'payload_test'
}

export const successSendResponseMock: HttpResponse = {
  success: true,
  statusCode: 200,
  data: {
    info1: 'payload_test',
    info2: 'payload_test',
    info3: 'payload_test'
  },
  error: null
}
