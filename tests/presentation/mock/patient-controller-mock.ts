import { HttpResponse, HttpRequest } from '../../../src/presentation/protocols'

export const paramErrorResponse: HttpResponse = {
  success: false,
  statusCode: 400,
  data: null,
  error: 'fields weight is required'
}

export const paramErrorRequest: HttpRequest = {
  body: {
    name: 'name',
    phone: '48123456789',
    birthDate: '28/03/50',
    height: 175
  }
}
