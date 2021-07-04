import { HttpRequest, HttpResponse } from './http'

export type ControllerMethod = (req: HttpRequest) => Promise<HttpResponse>
