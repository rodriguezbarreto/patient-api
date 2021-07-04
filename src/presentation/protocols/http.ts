export interface HttpResponse {
  success: boolean
  statusCode: number
  data: any
  error: any
}

export interface HttpRequest {
  body?: any
  params?: any
}
