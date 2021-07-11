import { HttpRequest, HttpResponse } from './http'

export interface Controller{
  service: (request: HttpRequest) => Promise<HttpResponse>
}
