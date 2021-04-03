/* eslint-disable no-unused-vars */
import { NextFunction } from 'express'
import { Response } from '../utils/response'
import { Context, HTTPMethod } from './action'

export interface EndpointActionHandler {
  (
    ctx: Context
  ): Promise<Response> | Response
}

export interface MiddlewareHandler {
  (
    ctx: Context,
    next: NextFunction
  ): Promise<any> | any
}

export interface EndpointAction {
  before?: MiddlewareHandler[],
  after?: MiddlewareHandler[]
  method?: HTTPMethod
  handler: EndpointActionHandler
}

export interface Endpoint {
  [endpointId: string]: EndpointAction
}
