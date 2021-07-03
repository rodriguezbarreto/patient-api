import { ResponseHandler } from '../../presentation/protocols/http'

export const sendResponse = (statusCode: number, data: any): ResponseHandler => {
  const validateError = statusCode >= 200 && statusCode <= 299
  return {
    success: !!validateError,
    statusCode,
    data: validateError ? data : null,
    error: validateError ? null : data
  }
}