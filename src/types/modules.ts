import { NextFunction, Request } from 'express'

export interface Context {
  params: Request
}

export interface EndpointHandler {
    (
      ctx: Context
    ): Promise<any> | any
}

export interface MiddlewareHandler {
  (
    ctx: Context,
    action: any,
    next: NextFunction
  ): Promise<any> | any
}

export interface EndpointAction {
  before?: MiddlewareHandler[],
  handler: EndpointHandler
}

export interface Endpoint {
  [endpointId: string]: EndpointAction
}
