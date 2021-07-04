import { HttpResponse } from '../protocols/http'
import { getErrors } from './get-errors'

export const sendResponse = (statusCode: number, data?: any): HttpResponse => {
  const successCode = statusCode >= 200 && statusCode <= 299
  return {
    success: !!successCode,
    statusCode,
    data: successCode ? data : null,
    error: successCode ? null : data || getErrors(statusCode)
  }
}
